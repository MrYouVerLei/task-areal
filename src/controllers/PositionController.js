import PositionService from "../services/PositionService.js";

class PositionController {
    async getAllPositions(req, res) {
        try {
            const positions = await PositionService.getAllPositions();
            return res.json(positions);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}


export default new PositionController();