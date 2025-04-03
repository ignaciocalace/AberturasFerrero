import "./JobsAdmin.scss";
import Modal from "react-modal";
import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { signOut } from "firebase/auth";
import { Accordion, Card, Form } from "react-bootstrap";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../../components/Loading/Loading.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMsg from "../../../../components/ErrorMsg/ErrorMsg.jsx";
import { db, auth, storage } from "../../../../config/configFirestore";
import HeaderTitle from "../../../../components/HeaderTitle/HeaderTitle.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

Modal.setAppElement("#root");

const JobsAdmin = () => {
  const [form, setForm] = useState({
    title: "",
    images: [],
    type: "",
    description: "",
    category: "",
  });

  const fileInputRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const jobsCollection = collection(db, "JobsNew");
          const querySnapshot = await getDocs(jobsCollection);
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setJobs(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prevForm) => ({
      ...prevForm,
      images: [...prevForm.images, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    const removedImage = form.images[index];
    setDeletedImages([...deletedImages, removedImage]);

    const updatedImages = form.images.filter((_, i) => i !== index);
    setForm((prevForm) => ({
      ...prevForm,
      images: updatedImages,
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(form.images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setForm((prevForm) => ({
      ...prevForm,
      images: items,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("User not authenticated.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsUploading(true);

    try {
      const newJob = {
        title: form.title,
        images: [],
        type: form.type,
        description: form.description,
        category: form.category,
      };
      const newDoc = await addDoc(collection(db, "JobsNew"), newJob);
      const jobId = newDoc.id;
      const folderName = `${form.title}_${jobId}`;

      const imageUrls = [];
      for (let i = 0; i < form.images.length; i++) {
        const imageRef = ref(storage, `${folderName}/${form.images[i].name}`);
        await uploadBytes(imageRef, form.images[i]);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }

      const updatedJob = {
        ...newJob,
        images: imageUrls,
      };

      await updateDoc(doc(db, "JobsNew", jobId), updatedJob);

      setForm({
        title: "",
        images: [],
        type: "",
        description: "",
        category: "",
      });
      setJobs((prevJobs) => [...prevJobs, { ...updatedJob, id: jobId }]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearForm = () => {
    setForm({
      title: "",
      images: [],
      type: "",
      description: "",
      category: "",
    });
    setShowClearModal(false);
  };

  const handleUpdate = async (e, id, updatedJob) => {
    e.preventDefault();

    try {
      const jobDoc = doc(db, "JobsNew", id);
      const folderName = `${updatedJob.title}_${id}`;
      const imageUrls = [];
      setIsUploading(true);

      for (let i = 0; i < updatedJob.images.length; i++) {
        if (updatedJob.images[i] instanceof File) {
          const imageRef = ref(
            storage,
            `${folderName}/${updatedJob.images[i].name}`
          );
          await uploadBytes(imageRef, updatedJob.images[i]);
          const url = await getDownloadURL(imageRef);
          imageUrls.push(url);
        } else {
          imageUrls.push(updatedJob.images[i]);
        }
      }

      const updatedData = {
        ...updatedJob,
        images: imageUrls,
      };

      await updateDoc(jobDoc, updatedData);
      const updatedJobs = jobs.map((job) =>
        job.id === id ? { ...job, ...updatedData } : job
      );
      setJobs(updatedJobs);
      setShowEditModal(false);
      setIsUploading(false);

      setForm({
        title: "",
        images: [],
        type: "",
        description: "",
        category: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsUploading(true);
      const jobDoc = doc(db, "JobsNew", id);
      const jobSnapshot = await getDoc(jobDoc);
      const jobData = jobSnapshot.data();

      if (Array.isArray(jobData.images)) {
        for (const imageUrl of jobData.images) {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        }
      }

      await deleteDoc(jobDoc);

      const filteredJobs = jobs.filter((job) => job.id !== id);
      setJobs(filteredJobs);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting job:", error);
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const startEditing = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      images: job.images,
      type: job.type,
      description: job.description,
      category: job.category,
    });
    setShowEditModal(true);
  };

  const confirmDelete = (job) => {
    setEditingJob(job);
    setShowDeleteModal(true);
  };

  const aluminumTypes = [
    "Serie 20",
    "Serie 25",
    "Serie 25 Plus",
    "Serie 25 MAX",
    "Serie 30 Mecal",
    "Serie Probba",
    "Serie Módena",
    "Serie Gala",
    "Serie Gala CR",
    "Serie A30 New",
    "Serie Summa",
    "Otros",
  ];

  const validateForm = () => {
    const { title, images, type, description, category } = form;
    if (!title || !images.length || !type || !description || !category) {
      return false;
    }
    return true;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg message={error} />;
  }

  if (!user) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <div className="container-JobsAdmin">
      <HeaderTitle
        text="Administración de publicaciones"
        backgroundImage="/img/imgFixed/admin.jpg"
      />
      <div className="logout-button-container">
        <button
          className="button-standard button-logout"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
      <h3>Agregar nuevo trabajo</h3>
      <div className="form-container">
        <form className="form-fields" onSubmit={handleUpload}>
          <h4>Información</h4>
          <input
            type="text"
            name="title"
            placeholder="Titulo"
            value={form.title}
            onChange={handleInputChange}
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            <option value="Aluminio">Aluminio</option>
            <option value="Herreria">Herrería</option>
            <option value="Aluminio y Herreria">Aluminio y Herrería</option>
            <option value="Otros">Otros</option>
          </select>
          {form.category === "Aluminio" && (
            <select
              name="type"
              value={form.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar tipo</option>
              {aluminumTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}
          {form.category !== "Aluminio" && (
            <input
              type="text"
              name="type"
              placeholder="Tipo"
              value={form.type}
              onChange={handleInputChange}
              required
            />
          )}
          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleInputChange}
            autoCorrect="on"
            spellCheck="true"
            required
            rows="4"
            cols="50"
          />
          <div className="button-group">
            <button
              type="submit"
              className="button-upload button-standard button-success"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  Subiendo <FontAwesomeIcon icon={faSpinner} spin />
                </>
              ) : (
                "Subir"
              )}
            </button>
            <button
              type="button"
              className="button-clear button-standard button-danger"
              onClick={() => setShowClearModal(true)}
              disabled={isUploading}
            >
              Limpiar
            </button>
          </div>
        </form>
        <div className="image-upload-container">
          <h4>Imágenes</h4>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            className="custom-file-input"
            required
          />
          <button
            className="button-choose-files"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            Seleccionar Archivos
          </button>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  className="image-previews"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {form.images.map((file, index) => (
                    <Draggable
                      key={index}
                      draggableId={`item-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="image-preview"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img
                            src={
                              file instanceof File
                                ? URL.createObjectURL(file)
                                : file
                            }
                            alt={`preview ${index}`}
                            className="preview-image"
                          />
                          <button
                            className="remove-image-button"
                            onClick={() => handleRemoveImage(index)}
                          >
                            X
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div>
        <h3>Trabajos</h3>
        <Form.Control
          type="text"
          placeholder="Buscar por título"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <Card.Body>
          <Accordion>
            {filteredJobs.map((job) => (
              <Accordion.Item eventKey={job.id} key={job.id}>
                <Accordion.Header>{job.title}</Accordion.Header>
                <Accordion.Body>
                  <div className="job-item">
                    <div className="job-details">
                      <div className="job-info">
                        <p>
                          <span>Descripción:</span> {job.description}
                        </p>
                        <p>
                          <span> Categoría: </span> {job.category}
                        </p>
                        <p>
                          <span>Tipo:</span> {job.type}
                        </p>
                        <p>
                          <span> Cant. Imágenes: </span>
                          {job.images.length}
                        </p>
                      </div>
                      {Array.isArray(job.images) && job.images.length > 0 && (
                        <img
                          src={job.images[0]}
                          alt={`Job ${job.title}`}
                          className="job-image"
                        />
                      )}
                    </div>
                  </div>
                  <div className="job-actions">
                    <button
                      className="button-edit button-standard"
                      onClick={() => startEditing(job)}
                    >
                      Editar
                    </button>
                    <button
                      className="button-delete button-standard button-danger"
                      onClick={() => confirmDelete(job)}
                    >
                      Eliminar
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </div>
      <Modal
        isOpen={showClearModal}
        onRequestClose={() => setShowClearModal(false)}
        contentLabel="Confirm Clear"
        className="custom-modal-content small-modal"
        overlayClassName="custom-modal-overlay"
      >
        <h3>Confirmar Limpiar</h3>
        <p>¿Estás seguro de que quieres limpiar el formulario?</p>
        <div className="modal-buttons">
          <button
            className="button-clear button-standard button-danger"
            onClick={handleClearForm}
            disabled={isUploading}
          >
            Limpiar
          </button>
          <button
            className="button-return button-standard"
            onClick={() => setShowClearModal(false)}
            disabled={isUploading}
          >
            Regresar
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        contentLabel="Confirm Delete"
        className="custom-modal-content small-modal"
        overlayClassName="custom-modal-overlay"
      >
        <h3>Confirmar Eliminación</h3>
        <p>¿Estás seguro de que quieres eliminar este trabajo?</p>
        <div className="modal-buttons">
          <button
            className="button-delete button-standard button-danger"
            onClick={() => handleDelete(editingJob.id)}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                Eliminando <FontAwesomeIcon icon={faSpinner} spin />
              </>
            ) : (
              "Eliminar"
            )}
          </button>
          <button
            className="button-return button-standard"
            onClick={() => setShowDeleteModal(false)}
            disabled={isUploading}
          >
            Regresar
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        contentLabel="Editar Trabajo"
        className="custom-modal-content"
        overlayClassName="custom-modal-overlay"
      >
        <h3>Editar Trabajo</h3>
        <div className="form-container">
          <form
            className="form-fields"
            onSubmit={(e) => handleUpdate(e, editingJob.id, form)}
          >
            <h4>Información</h4>
            <input
              type="text"
              name="title"
              placeholder="Titulo"
              value={form.title}
              onChange={handleInputChange}
              required
            />
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="Aluminio">Aluminio</option>
              <option value="Herreria">Herrería</option>
              <option value="Aluminio y Herreria">Aluminio y Herrería</option>
              <option value="Otros">Otros</option>
            </select>
            {form.category === "Aluminio" && (
              <select
                name="type"
                value={form.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar tipo</option>
                {aluminumTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}
            {form.category !== "Aluminio" && (
              <input
                type="text"
                name="type"
                placeholder="Tipo"
                value={form.type}
                onChange={handleInputChange}
                required
              />
            )}
            <textarea
              name="description"
              placeholder="Descripción"
              value={form.description}
              onChange={handleInputChange}
              required
              rows="4"
              cols="50"
            />
          </form>
          <div className="image-upload-container">
            <h4>Imágenes</h4>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              className="custom-file-input"
              required
            />
            <button
              className="button-choose-files"
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              Seleccionar Archivos
            </button>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="images" direction="horizontal">
                {(provided) => (
                  <div
                    className="image-previews"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {form.images.map((file, index) => (
                      <Draggable
                        key={index}
                        draggableId={`item-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="image-preview"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <img
                              src={
                                file instanceof File
                                  ? URL.createObjectURL(file)
                                  : file
                              }
                              alt={`preview ${index}`}
                              className="preview-image"
                            />
                            <button
                              className="remove-image-button"
                              onClick={() => handleRemoveImage(index)}
                            >
                              X
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <div className="modal-buttons">
          <button
            type="submit"
            className="button-upload button-standard button-success"
            onClick={(e) => handleUpdate(e, editingJob.id, form)}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                Guardando <FontAwesomeIcon icon={faSpinner} spin />
              </>
            ) : (
              "Guardar"
            )}
          </button>
          <button
            type="button"
            className="button-clear button-standard button-danger"
            onClick={() => {
              handleClearForm();
              setShowEditModal(false);
            }}
            disabled={isUploading}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default JobsAdmin;
