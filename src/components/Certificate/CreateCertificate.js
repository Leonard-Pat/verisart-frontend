import styles from "./certificate.module.scss";
import React from 'react';
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import TextField from '@mui/material/TextField';
import { create } from "ipfs-http-client";
import {Buffer} from "buffer"
import { Contract } from '@ethersproject/contracts'
import {useContractFunction} from '@usedapp/core'
import certificatejson from "../../assets/Certificates.json"


const certificateabi = certificatejson.abi
const certificateaddr = "0x8c1AfF787D8748eA86d7ee6285C1EEA22be337E0"


const fileTypes = ["JPG", "PNG", "SVG"]
const projectId = '2FoGvgJ7piElXg7gPawjn6RUWdT';
const projectSecret = '69b294d03057a9ea13fb4e6f2863bd87';

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});


const CreateCertificate = () => {

  const certificateContract = new Contract(certificateaddr, certificateabi)

  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [year, setYear] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const contractCall = useContractFunction(certificateContract, 'createCertificate')

  
  const handleChange = (file) => {
    setSelectedFile(file)
  };

  const handleSubmit = async () => {
    try {
      const imageUpload = await client.add(selectedFile)
      const metaDataUpload = await client.add(Buffer.from(JSON.stringify({
          name: title,
          description: "Verified certificate",
          image: `https://test-certificate.infura-ipfs.io/ipfs/${imageUpload.path}`,
          attributes: [
            { trait_type: "Artist Name", value: artist},
            { trait_type: "Year of Production", value: year}
          ]
      })));
      const url = `https://test-certificate.infura-ipfs.io/ipfs/${metaDataUpload.path}`;
      await contractCall.send(url)
      var metaDataPath = localStorage.getItem("certificates")
      if (metaDataPath !== null) {
        metaDataPath = JSON.parse(metaDataPath)
        metaDataPath.push(metaDataUpload.path)
        localStorage.setItem("certificates", JSON.stringify(metaDataPath));
      } else {
        localStorage.setItem("certificates", JSON.stringify([metaDataUpload.path]));      
      }

    } catch (error) {
      console.log(error.message);
    }
  }

    useEffect(() => {
      if (!selectedFile) {
          setPreview(null)
          return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])





  return (
    <div className={styles.createWindow}>
      <div className={styles.form}>
      <h1 className={styles.header}>Certificate Details</h1>
      <div className={styles.inputs}>
        <div className={styles.inputItems}>
        <p>Title:</p>
        <TextField onChange={(e) => setTitle(e.target.value)} label="Title" variant="outlined" sx={{width: '250px'}}/>
        </div>
        <div className={styles.inputItems}>
        <p>Artist Name:</p>
        <TextField onChange={(e) => setArtist(e.target.value)} label="Artist" variant="outlined" sx={{width: '250px'}}/>
        </div>
        <div className={styles.inputItems}>
        <p>Year of Production:</p>
        <TextField onChange={(e) => setYear(e.target.value)} label="Year" variant="outlined" sx={{width: '250px'}} />
        </div>
      </div>
      <button onClick={handleSubmit} >Mint Certificate</button>
      </div>
      <div className={styles.imgUpload}>
        <h1 className={styles.header}>Image Upload and Preview</h1>
      {selectedFile &&  <img className={styles.preview} src={preview} alt='Peview' /> }
        <div className={styles.dropzone}>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        </div>
      </div>
    </div>
  );
}

export default CreateCertificate;
