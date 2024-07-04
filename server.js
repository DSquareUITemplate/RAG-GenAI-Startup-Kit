const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
// const port = process.env.PORT || 7690;

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(bodyParser.json());


const GCS_BUCKET_NAME = 'gbg-neuro-genai';

const storage = new Storage({
  projectId: "gbg-neuro",
  keyFilename: 'C:/Users/2259494/gbg-neuro-1c051eab5064.json', // path of service account key file
});

app.post('/faq', async (req, res) => {
  try {
    const { sourcePath } = req.body;

    if (!sourcePath) {
      return res.status(400).json({ error: 'Invalid source path' });
    }

    const fileType = path.extname(sourcePath).toLowerCase().replace('.', '');

    const GCS_DOCUMENT_PATH = sourcePath;

    const [file] = await storage.bucket(GCS_BUCKET_NAME).file(GCS_DOCUMENT_PATH).download();
    console.log('downloaded file', file)

    if (Buffer.isBuffer(file)) {

      if (fileType === 'xlsx') {     
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');   
      } else if (fileType === 'pdf') {     
        res.header('Content-Type', 'application/pdf');   
      } else {     // Handle other file types or send an appropriate error response    
        res.status(400).send('Unsupported file type');     
        return;   
      }

      // res.setHeader('Content-Disposition', `attachment; filename=${path.basename(GCS_DOCUMENT_PATH)}`);
      res.setHeader('Content-Disposition', 'inline; filename=' + path.basename(GCS_DOCUMENT_PATH));
      res.send(file);
      console.log('file success')
    } else {
      console.log('Error: downloadded file is not buffer');
      res.status(500).send('Internal Server Error');
    }

  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).send('Internal Server Error');
  }
});

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000', 'http://127.0.0.1:8000');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});