import Note from "../../Schema/NotesSchema";


export default function handler(req, res) {
    if (req.method == 'POST') {
        try {
            const notes = await Note.create(req.body)
            res.status(201).json("Stored Successfully");
        } catch (err) {
            res.status(500).json(err)
        }
    }
    if (req.method =='GET'){
        try {
            const note = await Note.find()
            res.status(201).json(note);
        } catch (err) {
            res.status(500).json(err)
        }
    }

}
