import {Router} from "express"
import { body, param } from "express-validator"
import { ProjectController } from "../controllers/ProjectController"
import { handleInputErrors } from "../middlewares/validation"
import { TaskController } from "../controllers/TaskController"
import { projectsExists } from "../middlewares/project"
import { taskBelongsToProject, taskExists } from "../middlewares/task"

const router = Router()

router.post("/",
    body("projectName")
    .notEmpty().withMessage("El Nombre del Proyecto es Obligatorio"),
    body("clientName")
    .notEmpty().withMessage("El Nombre del Cliente es Obligatorio"),
    body("description")
    .notEmpty().withMessage("La descripcion del Proyecto es Obligatoria"),
    handleInputErrors,
    ProjectController.createProjects 
)


router.get("/", ProjectController.getAllProjects )

router.get("/:id",
    param("id").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
     ProjectController.getProjectById)


router.put("/:id",
    param("id").isMongoId().withMessage("ID no válido"),
    body("projectName")
    .notEmpty().withMessage("El Nombre del Proyecto es Obligatorio"),
    body("clientName")
    .notEmpty().withMessage("El Nombre del Cliente es Obligatorio"),
    body("description")
    .notEmpty().withMessage("La descripcion del Proyecto es Obligatoria"),
    handleInputErrors,
    ProjectController.updateProject)

    router.delete("/:id",
        param("id").isMongoId().withMessage("ID no válido"),
        handleInputErrors,
        ProjectController.deleteProject)



////ROUTES FOR TASKS

router.param('projectId', projectsExists)


router.post("/:projectId/tasks",
    body("name")
    .notEmpty().withMessage("El Nombre de Tarea es Obligatorio"),
    body("description")
    .notEmpty().withMessage("La Descripcion de Tarea es Obligatorio"),
    handleInputErrors,
    TaskController.createTask
)
    

router.get("/:projectId/tasks",
    TaskController.getProjectTask

)
router.param("taskId",taskExists)
router.param("taskId",taskBelongsToProject)

router.get("/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    TaskController.getTaskById
)

router.put("/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("ID no válido"),
    body("name")
    .notEmpty().withMessage("El Nombre de Tarea es Obligatorio"),
    body("description")
    .notEmpty().withMessage("La Descripcion de Tarea es Obligatorio"),
    handleInputErrors,
    TaskController.updateTask
)

router.delete("/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    TaskController.deleteTask
)

router.post("/:projectId/tasks/:taskId/status",
    param("taskId").isMongoId().withMessage("ID no válido"),
    body("status")
        .notEmpty().withMessage("El estado es obligatorio"),
    handleInputErrors, 
    TaskController.updateStatus
)

export default router