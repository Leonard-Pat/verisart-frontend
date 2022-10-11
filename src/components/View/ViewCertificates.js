import styles from "./view.module.scss"
import { useState, useEffect } from "react";


function ViewCertificates() {

  const [metaDataList, setmetaDataList] = useState([])
  
  useEffect(() => {
    const getMetaData = async () => {
      let metaDataPathArr = localStorage.getItem('certificates')
      if (metaDataPathArr !== null) {
        metaDataPathArr = JSON.parse(metaDataPathArr)
        metaDataPathArr.map(async (path) => {
          const res = await fetch(`https://test-certificate.infura-ipfs.io/ipfs/${path}`)
          const resObj = await res.json()
          setmetaDataList(current => [...current, resObj]);
        })
      }
    }
    getMetaData()
}
  , [])
  

  return (
   <fieldset className={styles.view}>
    <legend>All Certificates</legend>
   {metaDataList.length === 0 ? <h1>You have no made no certificates</h1> : metaDataList.map(data => 
   <div className={styles.card}>
    <div className={styles.imageContainer}>
      <img className={styles.art} src={data.image} alt='Art'></img>
    </div>
      <div className={styles.description}>
      <h3>Artwork:</h3>
      <h3 className={styles.attribute}>{data.name}</h3>
      <h3>Artist Name:</h3>
      <h3 className={styles.attribute}>{data.attributes[0].value}</h3>
      <h3>Year Or Production :</h3>
      <h3 className={styles.attribute}>{data.attributes[1].value}</h3>
      </div>
   </div>
   )}
   </fieldset>
  )
}

export default ViewCertificates