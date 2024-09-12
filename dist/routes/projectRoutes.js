"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ProjectController_1 = require("../controllers/ProjectController");
const validation_1 = require("../middlewares/validation");
const TaskController_1 = require("../controllers/TaskController");
const project_1 = require("../middlewares/project");
const task_1 = require("../middlewares/task");
const router = (0, express_1.Router)();
router.post("/", (0, express_validator_1.body)("projectName")
    .notEmpty().withMessage("El Nombre del Proyecto es Obligatorio"), (0, express_validator_1.body)("clientName")
    .notEmpty().withMessage("El Nombre del Cliente es Obligatorio"), (0, express_validator_1.body)("description")
    .notEmpty().withMessage("La descripcion del Proyecto es Obligatoria"), validation_1.handleInputErrors, ProjectController_1.ProjectController.createProjects);
router.get("/", ProjectController_1.ProjectController.getAllProjects);
router.get("/:id", (0, express_validator_1.param)("id").isMongoId().withMessage("ID no válido"), validation_1.handleInputErrors, ProjectController_1.ProjectController.getProjectById);
router.put("/:id", (0, express_validator_1.param)("id").isMongoId().withMessage("ID no válido"), (0, express_validator_1.body)("projectName")
    .notEmpty().withMessage("El Nombre del Proyecto es Obligatorio"), (0, express_validator_1.body)("clientName")
    .notEmpty().withMessage("El Nombre del Cliente es Obligatorio"), (0, express_validator_1.body)("description")
    .notEmpty().withMessage("La descripcion del Proyecto es Obligatoria"), validation_1.handleInputErrors, ProjectController_1.ProjectController.updateProject);
router.delete("/:id", (0, express_validator_1.param)("id").isMongoId().withMessage("ID no válido"), validation_1.handleInputErrors, ProjectController_1.ProjectController.deleteProject);
////ROUTES FOR TASKS
router.param('projectId', project_1.projectsExists);
router.post("/:projectId/tasks", (0, express_validator_1.body)("name")
    .notEmpty().withMessage("El Nombre de Tarea es Obligatorio"), (0, express_validator_1.body)("description")
    .notEmpty().withMessage("La Descripcion de Tarea es Obligatorio"), validation_1.handleInputErrors, TaskController_1.TaskController.createTask);
router.get("/:projectId/tasks", TaskController_1.TaskController.getProjectTask);
router.param("taskId", task_1.taskExists);
router.param("taskId", task_1.taskBelongsToProject);
router.get("/:projectId/tasks/:taskId", (0, express_validator_1.param)("taskId").isMongoId().withMessage("ID no válido"), validation_1.handleInputErrors, TaskController_1.TaskController.getTaskById);
router.put("/:projectId/tasks/:taskId", (0, express_validator_1.param)("taskId").isMongoId().withMessage("ID no válido"), (0, express_validator_1.body)("name")
    .notEmpty().withMessage("El Nombre de Tarea es Obligatorio"), (0, express_validator_1.body)("description")
    .notEmpty().withMessage("La Descripcion de Tarea es Obligatorio"), validation_1.handleInputErrors, TaskController_1.TaskController.updateTask);
router.delete("/:projectId/tasks/:taskId", (0, express_validator_1.param)("taskId").isMongoId().withMessage("ID no válido"), validation_1.handleInputErrors, TaskController_1.TaskController.deleteTask);
router.post("/:projectId/tasks/:taskId/status", (0, express_validator_1.param)("taskId").isMongoId().withMessage("ID no válido"), (0, express_validator_1.body)("status")
    .notEmpty().withMessage("El estado es obligatorio"), validation_1.handleInputErrors, TaskController_1.TaskController.updateStatus);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map