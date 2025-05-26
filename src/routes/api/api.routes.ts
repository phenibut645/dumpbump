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
    console.log(req.body);
    if(req.body.rgb && req.body.name){
        groups.push({
            "name": req.body.name as string,
            "color": req.body.rgb.split(", ").map(el => Number(el)) as number[],
            "notes": []
        })
    }
    res.send({"response": {"success": 1}});
})
router.post("/notes/add", (req: Request, res:Response) => {
    console.log(req.body);
    if(req.body.rgb && req.body.name && req.body.groupName){
        console.log(req.body.groupName);
        const groupIndex = groups.findIndex(el => {
            console.log(el)
            return el.name === req.body.groupName
        });
        if(groupIndex === -1){
            res.send({"response": {"success": 0}});
            return;
        } 
        groups[groupIndex].notes.push({
            "name": req.body.name,
            "color": req.body.rgb,
            "text": ""
        })
    }
    res.send({"response": {"success": 1}});
})

router.get("/note-text/:grpNt", (req: Request, res: Response) => {
    if(req.params.grpNt){
        const [groupIndex, noteIndex] = req.params.grpNt.split("-").map(el => Number(el));
        console.log("Group Index", groupIndex, "Note index", noteIndex);
        res.json({text:groups[groupIndex]["notes"][noteIndex]["text"]});
    }
    res.status(400).json({response: {
        success: 0,
        error: "xz"
    }})
});

export default router;