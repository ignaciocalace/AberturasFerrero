import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import "react-clock/dist/Clock.css";
import { es } from "date-fns/locale";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { format, startOfWeek } from "date-fns";
import "react-time-picker/dist/TimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import { db } from "../../../../../config/configFirestore";
import Loading from "../../../../../components/Loading/Loading.jsx";
import ErrorMsg from "../../../../../components/ErrorMsg/ErrorMsg.jsx";
import HeaderTitle from "../../../../../components/HeaderTitle/HeaderTitle.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const EmployeesDetails = ({ user }) => {
  // console.log(user);
  const captureRef = useRef(null);
  const initialWeekSchedule = {
    Lunes: { entryTime: "07:00", exitTime: "17:30" },
    Martes: { entryTime: "07:00", exitTime: "17:30" },
    Miércoles: { entryTime: "07:00", exitTime: "17:30" },
    Jueves: { entryTime: "07:00", exitTime: "17:30" },
    Viernes: { entryTime: "07:00", exitTime: "17:30" },
    Sábado: { entryTime: "00:00", exitTime: "00:00" },
  };
  const initialEnabledDays = {
    Lunes: true,
    Martes: true,
    Miércoles: true,
    Jueves: true,
    Viernes: true,
    Sábado: false,
  };
  const daysOfWeek = useMemo(
    () => ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    []
  );

  const [bps, setBps] = useState(0);
  const [vale1, setVale1] = useState(0);
  const [vale2, setVale2] = useState(0);
  const [vale3, setVale3] = useState(0);
  const [vale4, setVale4] = useState(0);
  const [vale5, setVale5] = useState(0);
  const { id: employeeId } = useParams();
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [weekRange, setWeekRange] = useState("");
  const [hourlyRate, setHourlyRate] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [licenseDays, setLicenseDays] = useState(0);
  const [addExtraHr, setAddExtraHr] = useState("00:00");
  const [addSimpleHr, setAddSimpleHr] = useState("00:00");
  const [grossEarnings, setGrossEarnings] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [showAmounts, setShowAmounts] = useState(false);
  const [limitExtraHours, setLimitExtraHours] = useState(46);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [enabledDays, setEnabledDays] = useState(initialEnabledDays);
  const [weekSchedule, setWeekSchedule] = useState(initialWeekSchedule);

  const sendToWhatsApp = () => {
    // Sumar los vales
    const totalVales = vale1 + vale2 + vale3 + vale4 + vale5;

    const resumen = `📋 *Resumen de ${employee?.name}*\n
  📅 *Semana:* ${weekRange}
  
  🕒 *Días trabajados:*
  ${daysOfWeek
    .filter(
      (day) =>
        weekSchedule[day].entryTime !== "00:00" ||
        weekSchedule[day].exitTime !== "00:00"
    )
    .map(
      (day) =>
        `•⁠ ${day}: ${weekSchedule[day].entryTime} - ${weekSchedule[day].exitTime}`
    )
    .join("\n")}
  
  ⏳ *Total de horas trabajadas:* ${formatHours(totalHours)} horas${
      totalHours > limitExtraHours
        ? ` (${formatHours(limitExtraHours)} + ${formatHours(
            totalHours - limitExtraHours
          )} extra)`
        : ""
    } 
  ${
    addSimpleHr !== "00:00"
      ? `🟢 *Horas simples agregadas:* ${addSimpleHr}`
      : ""
  }
  ${addExtraHr !== "00:00" ? `🔵 *Horas extras agregadas:* ${addExtraHr}` : ""}
  ${licenseDays > 0 ? `🏖️ *Días de licencia:* ${licenseDays}` : ""}
  
  💰 *Monto Bruto:* ${grossEarnings.toLocaleString("es-UY", {
    style: "currency",
    currency: "UYU",
  })}
  
  🔻 *Descuentos:* - ${(grossEarnings - totalEarnings).toLocaleString("es-UY", {
    style: "currency",
    currency: "UYU",
  })}
     - 📌 *BPS:* - ${bps.toLocaleString("es-UY", {
       style: "currency",
       currency: "UYU",
     })}
     - 💵 *Vales:* - ${totalVales.toLocaleString("es-UY", {
       style: "currency",
       currency: "UYU",
     })}
  
  ✅ *Monto Líquido:* ${totalEarnings.toLocaleString("es-UY", {
    style: "currency",
    currency: "UYU",
  })}`;

    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(resumen)}`;
    window.location.href = whatsappUrl;
  };

  const toggleShowAmounts = () => {
    setShowAmounts(!showAmounts);
  };
  const getFridayDate = (date) => {
    const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
    return new Date(startOfWeekDate.setDate(startOfWeekDate.getDate() + 4));
  };

  const getWeekRange = (date) => {
    if (date instanceof Object && date.seconds) {
      date = new Date(date.seconds * 1000);
    }

    const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
    const fridayOfWeek = getFridayDate(date);

    return `Lunes ${format(startOfWeekDate, "d 'de' MMM.", { locale: es })} 
            al Viernes ${format(fridayOfWeek, "d 'de' MMM. yyyy", {
              locale: es,
            })}`;
  };

  const formatHours = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };
  const convertToDate = (timestamp) => {
    if (!timestamp) return null;

    if (timestamp instanceof Date) return timestamp;

    if (timestamp.seconds) return new Date(timestamp.seconds * 1000);

    return new Date(timestamp);
  };

  const filterWeekData = (date, data) => {
    const selectedFriday = getFridayDate(date).toISOString();
    const matchingWeek = data.find((entry) => {
      const entryDate = getFridayDate(convertToDate(entry.timestamp));
      return entryDate ? entryDate.toISOString() === selectedFriday : false;
    });

    if (matchingWeek) {
      setWeekSchedule(matchingWeek.weekSchedule);
      setEnabledDays(matchingWeek.enabledDays);
      setHourlyRate(matchingWeek.hourlyRate);
      setAddSimpleHr(matchingWeek.addSimpleHr);
      setAddExtraHr(matchingWeek.addExtraHr);
      setLicenseDays(matchingWeek.licenseDays || 0);
      setVale1(matchingWeek.vale1);
      setVale2(matchingWeek.vale2);
      setVale3(matchingWeek.vale3);
      setVale4(matchingWeek.vale4);
      setVale5(matchingWeek.vale5);
      setBps(matchingWeek.bps);
    } else {
      const pastWeeks = data
        .map((entry) => ({
          ...entry,
          timestamp: getFridayDate(convertToDate(entry.timestamp)),
        }))
        .filter((entry) => entry.timestamp < new Date(selectedFriday))
        .sort((a, b) => b.timestamp - a.timestamp);

      const lastKnownHourlyRate =
        pastWeeks.length > 0 ? pastWeeks[0].hourlyRate : 0;

      setWeekSchedule(initialWeekSchedule);
      setEnabledDays(initialEnabledDays);
      setHourlyRate(lastKnownHourlyRate);
      setAddSimpleHr("00:00");
      setAddExtraHr("00:00");
      setLicenseDays(0);
      setVale1(0);
      setVale2(0);
      setVale3(0);
      setVale4(0);
      setVale5(0);
      setBps(0);
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!employeeId) {
          throw new Error("No se proporcionó el ID del empleado.");
        }

        const docRef = doc(db, "Employees", employeeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const employeeData = docSnap.data();
          setEmployee(employeeData);
          setWeekSchedule(initialWeekSchedule);
          calculateTotalHours(employeeData.weekSchedule || {});
        } else {
          throw new Error("Empleado no encontrado.");
        }
      } catch (err) {
        console.error("Error al cargar el empleado:", err);
        setError("Error al cargar el empleado.");
      } finally {
        setLoading(false);
      }
    };

    const fetchHistory = async () => {
      try {
        if (!employeeId) return;

        const weeklyRef = collection(db, "History", employeeId, "Weekly");
        const q = query(weeklyRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const historyData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp.toDate(),
          }));
          setHistory(historyData);

          filterWeekData(new Date(), historyData);
        } else {
          console.log("No se encontró historial para este empleado.");
          setHistory([]);
        }
      } catch (err) {
        console.error("Error al cargar el historial:", err);
        setError("Error al cargar el historial.");
      }
    };
    setWeekRange(getWeekRange(new Date()));
    fetchEmployee();
    fetchHistory();
  }, [employeeId]);
  const calculateTotalHours = useCallback(
    (schedule) => {
      let totalMinutes = 0;

      daysOfWeek.forEach((day) => {
        if (!enabledDays[day]) {
          return;
        }

        const entryTime = schedule[day]?.entryTime || "07:00";
        const exitTime = schedule[day]?.exitTime || "17:30";

        const [entryHour, entryMinute] = entryTime.split(":").map(Number);
        const [exitHour, exitMinute] = exitTime.split(":").map(Number);

        const entryTotalMinutes = entryHour * 60 + entryMinute;
        const exitTotalMinutes = exitHour * 60 + exitMinute;

        if (exitTotalMinutes > entryTotalMinutes) {
          const dailyMinutes = exitTotalMinutes - entryTotalMinutes - 60;
          totalMinutes += dailyMinutes;
        }
      });

      setTotalHours(totalMinutes / 60);
    },
    [daysOfWeek, enabledDays]
  );
  const calculateEarnings = useCallback(() => {
    let regularHours = Math.min(totalHours, limitExtraHours);
    let extraHours = Math.max(totalHours - limitExtraHours, 0);

    const parseTimeToMinutes = (time) => {
      if (!time) return 0;
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const simpleMinutes = parseTimeToMinutes(addSimpleHr);
    const extraMinutes = parseTimeToMinutes(addExtraHr);

    const additionalSimpleHours = simpleMinutes / 60;
    const additionalExtraHours = extraMinutes / 60;

    regularHours += additionalSimpleHours;
    extraHours += additionalExtraHours;

    const gross =
      (regularHours + extraHours * 2 + licenseDays * (8 + 6.4)) * hourlyRate;
    const net = gross - (vale1 + vale2 + vale3 + vale4 + vale5 + bps);

    return { gross, net };
  }, [
    totalHours,
    limitExtraHours,
    hourlyRate,
    addSimpleHr,
    addExtraHr,
    licenseDays,
    vale1,
    vale2,
    vale3,
    vale4,
    vale5,
    bps,
  ]);

  useEffect(() => {
    const { gross, net } = calculateEarnings();
    setGrossEarnings(gross);
    setTotalEarnings(net);
  }, [calculateEarnings]);

  const handleSaveSchedule = async () => {
    try {
      const fridayTimestamp = Timestamp.fromDate(getFridayDate(selectedDate));
      const historyRef = doc(
        db,
        "History",
        employeeId,
        "Weekly",
        fridayTimestamp.toMillis().toString()
      );
      const historySnap = await getDoc(historyRef);

      const newEntry = {
        weekSchedule,
        enabledDays,
        totalHours,
        hourlyRate,
        addSimpleHr: addSimpleHr || "00:00",
        addExtraHr: addExtraHr || "00:00",
        licenseDays: licenseDays || 0,
        vale1: vale1 || 0,
        vale2: vale2 || 0,
        vale3: vale3 || 0,
        vale4: vale4 || 0,
        vale5: vale5 || 0,
        bps: bps || 0,
        grossEarnings: grossEarnings || 0,
        netEarnings: totalEarnings || 0,
        timestamp: fridayTimestamp,
        lastEdited: Timestamp.fromDate(new Date()),
      };

      if (historySnap.exists()) {
        await updateDoc(historyRef, newEntry);
        setHistory((prevHistory) =>
          prevHistory
            .map((entry) =>
              (entry.timestamp?.toMillis
                ? entry.timestamp.toMillis()
                : new Date(entry.timestamp).getTime()) ===
              fridayTimestamp.toMillis()
                ? newEntry
                : entry
            )
            .sort(
              (a, b) =>
                (b.timestamp?.toMillis
                  ? b.timestamp.toMillis()
                  : new Date(b.timestamp).getTime()) -
                (a.timestamp?.toMillis
                  ? a.timestamp.toMillis()
                  : new Date(a.timestamp).getTime())
            )
        );
      } else {
        await setDoc(historyRef, newEntry);
        setHistory((prevHistory) =>
          [...prevHistory, newEntry].sort(
            (a, b) =>
              (b.timestamp?.toMillis
                ? b.timestamp.toMillis()
                : new Date(b.timestamp).getTime()) -
              (a.timestamp?.toMillis
                ? a.timestamp.toMillis()
                : new Date(a.timestamp).getTime())
          )
        );
      }

      toast.success("Horario y salario guardados correctamente.");
    } catch (err) {
      console.error("Error al guardar el horario:", err);
      toast.error("No se pudo guardar el horario.", err);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setWeekRange(getWeekRange(date));
    filterWeekData(date, history);
    const febFirst2025 = new Date(2025, 1, 1);
    setLimitExtraHours(date >= febFirst2025 ? 46 : 47);
  };

  const handleTimeChange = (day, type, time) => {
    setWeekSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: time,
      },
    }));

    calculateTotalHours({
      ...weekSchedule,
      [day]: {
        ...weekSchedule[day],
        [type]: time,
      },
    });
  };

  useEffect(() => {
    calculateTotalHours(weekSchedule);
  }, [weekSchedule, calculateTotalHours]);

  const handleDayToggle = (day) => (e) => {
    const isEnabled = e.target.checked;

    setWeekSchedule((prevSchedule) => {
      const updatedDaySchedule = {
        ...prevSchedule[day],
        ...(isEnabled
          ? { entryTime: "07:00", exitTime: "17:30" }
          : { entryTime: "00:00", exitTime: "00:00" }),
      };

      const newSchedule = {
        ...prevSchedule,
        [day]: updatedDaySchedule,
      };
      return newSchedule;
    });

    setEnabledDays((prev) => {
      const newEnabledDays = {
        ...prev,
        [day]: isEnabled,
      };
      return newEnabledDays;
    });
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMsg message={error} />;

  return (
    <div className="schedule-container">
      <HeaderTitle
        text={`Horarios de ${employee?.name}`}
        backgroundImage="/img/imgFixed/clockCalendar.jpg"
      />
      {employee && (
        <div className="schedule-details">
          <div className="card-def employee-info">
            <p>
              <strong>Puesto:</strong> {employee.position}
            </p>
            <p>
              <strong>Fecha contratación:</strong> {employee.hireDate}
            </p>
            <p>
              <strong>CI: </strong>
              {employee.idNumber}
            </p>
          </div>
          <div className="date-container">
            <h3>Semana {weekRange}</h3>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              locale={es}
            />
          </div>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Habilitado</th>
                <th>Día</th>
                <th>Hora de Entrada</th>
                <th>Hora de Salida</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day) => (
                <tr key={day}>
                  <td>
                    <input
                      type="checkbox"
                      checked={enabledDays[day]}
                      onChange={handleDayToggle(day)}
                    />
                  </td>
                  <td>{day}</td>
                  <td>
                    <TimePicker
                      value={
                        !enabledDays[day]
                          ? "00:00"
                          : weekSchedule[day]?.entryTime
                      }
                      onChange={(time) =>
                        handleTimeChange(day, "entryTime", time)
                      }
                      clearIcon={null}
                      disableClock={true}
                      disabled={!enabledDays[day]}
                    />
                  </td>
                  <td>
                    <TimePicker
                      value={
                        !enabledDays[day]
                          ? "00:00"
                          : weekSchedule[day]?.exitTime
                      }
                      onChange={(time) =>
                        handleTimeChange(day, "exitTime", time)
                      }
                      clearIcon={null}
                      disableClock={true}
                      disabled={!enabledDays[day]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="container-grid">
            <div className="card-def additional-hours">
              <h3>Horas adicionales</h3>
              <div className="hours-section">
                <label>
                  Horas simples:
                  <TimePicker
                    value={!addSimpleHr ? "00:00" : addSimpleHr}
                    onChange={(time) => setAddSimpleHr(time)}
                    clearIcon={null}
                    disableClock={true}
                  />
                </label>
                <label>
                  Horas extra:
                  <TimePicker
                    value={!addExtraHr ? "00:00" : addExtraHr}
                    onChange={(time) => setAddExtraHr(time)}
                    clearIcon={null}
                    disableClock={true}
                  />
                </label>
              </div>
            </div>
            <div className="card-def license-hours">
              <h3>Licencia</h3>
              <div className="license-section">
                <label>Días de Licencia </label>
                <input
                  type="number"
                  value={licenseDays}
                  onChange={(e) => setLicenseDays(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="card-def discounts-section ">
              <h3>Descuentos</h3>
              <div className="vale-section ">
                <label>Vales:</label>
                {[setVale1, setVale2, setVale3, setVale4, setVale5].map(
                  (setVale, index) => (
                    <input
                      key={index}
                      type="number"
                      value={[vale1, vale2, vale3, vale4, vale5][index]}
                      onChange={(e) => setVale(Number(e.target.value))}
                    />
                  )
                )}
              </div>

              <div className="bps-section ">
                <label>BPS: </label>
                <input
                  type="number"
                  value={bps}
                  onChange={(e) => setBps(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="salary-input">
            <label>Salario por Hora: $</label>
            <input
              type={showAmounts ? "text" : "password"}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
            />
            <button onClick={toggleShowAmounts}>
              {showAmounts ? "Ocultar Montos" : "Mostrar Montos"}
            </button>
          </div>
          <div ref={captureRef} className="card-def container-resume">
            <div className="hours-horizontal">
              <h3>{`Resumen de ${employee?.name}`}</h3>

              <button onClick={sendToWhatsApp} className="icon-button">
                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
              </button>
            </div>
            <p className="weekrange">{weekRange}</p>
            <div className="hours-horizontal">
              <div className="schedule-summary">
                <h4>Días trabajados</h4>
                {daysOfWeek
                  .filter(
                    (day) =>
                      weekSchedule[day].entryTime !== "00:00" ||
                      weekSchedule[day].exitTime !== "00:00"
                  )
                  .map((day) => (
                    <p key={day}>
                      {day}: <span>{weekSchedule[day].entryTime}</span> a{" "}
                      <span>{weekSchedule[day].exitTime}</span>
                    </p>
                  ))}
              </div>
              <div className="hours-summary">
                <p className="total-hours">
                  Total de horas trabajadas:{" "}
                  <span>{formatHours(totalHours)} horas</span>
                  {totalHours > limitExtraHours && (
                    <span>
                      {" "}
                      ({formatHours(limitExtraHours)} +{" "}
                      {formatHours(totalHours - limitExtraHours)} horas extra)
                    </span>
                  )}
                </p>
                {addSimpleHr !== "00:00" && (
                  <p className="extra-hours">
                    Horas simples agregadas: <span>{addSimpleHr}</span>
                  </p>
                )}
                {addExtraHr !== "00:00" && (
                  <p className="extra-hours">
                    Horas extras agregadas: <span>{addExtraHr}</span>
                  </p>
                )}
                {licenseDays > 0 && (
                  <p className="license-days">
                    Días de licencia: <span>{licenseDays}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="salary-details">
              <p>
                Monto bruto:{" "}
                <span className="amount">
                  {showAmounts
                    ? grossEarnings.toLocaleString("es-UY", {
                        style: "currency",
                        currency: "UYU",
                      })
                    : "*****"}
                </span>
              </p>
              <p>
                Descuentos:{" "}
                <span className="discount">
                  {showAmounts
                    ? `- ${(grossEarnings - totalEarnings).toLocaleString(
                        "es-UY",
                        { style: "currency", currency: "UYU" }
                      )}`
                    : "*****"}
                </span>
              </p>
              <p>
                Monto Líquido:{" "}
                <span className="amount">
                  {showAmounts
                    ? totalEarnings.toLocaleString("es-UY", {
                        style: "currency",
                        currency: "UYU",
                      })
                    : "*****"}
                </span>
              </p>
            </div>
          </div>
          <button className="save-button" onClick={handleSaveSchedule}>
            Guardar Horario y Salario
          </button>
          <h3>Historial de Semanas:</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Horas</th>
                <th>BPS</th>
                <th>Líquido</th>
              </tr>
            </thead>
            <tbody>
              {history.map((week, index) => (
                <tr key={index}>
                  <td>
                    {week.timestamp
                      ? getWeekRange(week.timestamp)
                      : "Sin fecha"}
                  </td>

                  <td>{formatHours(week.totalHours)} horas</td>
                  <td>
                    {showAmounts
                      ? week.bps?.toLocaleString("es-UY", {
                          style: "currency",
                          currency: "UYU",
                        })
                      : "****"}
                  </td>
                  <td>
                    {showAmounts
                      ? week.netEarnings?.toLocaleString("es-UY", {
                          style: "currency",
                          currency: "UYU",
                        })
                      : "****"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EmployeesDetails;
