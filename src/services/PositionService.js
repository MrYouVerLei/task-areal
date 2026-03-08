import models from "../../models/index.js";
const { Position } = models;

class PositionService {
    async getAllPositions() {
        const posiitions = await Position.findAll({
            order: ['name']
        }
        );
        return posiitions;
    }
}

export default new PositionService();