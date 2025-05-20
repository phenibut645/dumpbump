import { Request, Response, Router } from 'express';
import groups from '../../utils/data.js';

const router = Router();


router.get('/', (req: Request, res: Response) => {
    res.send({"response": {
        "success": 1,
        "message": "example"
    }})
});

router.get("/groups", (req: Request, res: Response) => {
    res.send({
        "response": {
            "success": 1,
            "data": groups
        }
    })
})
router.post("/groups/add", (req: Request, res:Response) => {
    res.send({"response":1})
})

export default router;