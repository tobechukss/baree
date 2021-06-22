import React, { Component } from 'react';
import {Image, Container, Row, Col} from 'react-bootstrap';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';




import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';




const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const loginButtonUrl = 'https://firebasestorage.googleapis.com/v0/b/baree-41c3c.appspot.com/o/noimg.jpg?alt=media&token=547c3281-7236-4d62-816a-2b1bc9b5f493';

const styles = {
    backgroundImage: `url(${loginButtonUrl})`,
    minHeight:'215px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    displayName: 'block',
    backgroundRepeat: 'no-repeat',
    width: '75%',
    margin: '120px auto 60px',
    borderRadius: '10px'
}


class Home extends Component {
    
    constructor(props) {
        
        super(props);
        
       
        
        this.state = {
            allPhotos: [],
            currentPhoto: '',
            imageRef: ''
        };
        
        this.getInitial = this.getInitial.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
      
       
    }

    
    
    async handleRemove(id) {
        console.log('photo id', id)
        await firebase.firestore().collection('photos').doc(id).delete();
        this.getInitial();
    }
    
    componentDidMount() {
        this.getInitial();
    }
    
    getInitial() {
        firebase.auth().onAuthStateChanged(user => {
            
            let userId = user.uid;
            let imageRef = `images/${userId}`;
            
            this.setState({ imageRef });
            
            if (user) {
                firebase.firestore().collection('photos').onSnapshot(snapshot => {
                     
                    let allPhotos = [];
                    snapshot.forEach(doc => {
                        var newItem = doc.data();
                        newItem.id = doc.id;
                        allPhotos.push(newItem);
                    })
                    
                    // console.log('allPhotos', allPhotos);
                    this.setState({ allPhotos });
                });
            }
        })
    }
    
  

       

    async handleUploadSuccess (filename) {
        try {
            let { bucket, fullPath } = await firebase.storage().ref(this.state.imageRef).child(filename).getMetadata();
            console.log('bucket', bucket)
            console.log('fullPath', fullPath)
            let downloadURL = await firebase.storage().ref(this.state.imageRef).child(filename).getDownloadURL();
            console.log('downloadURL', downloadURL)
            
            let { uid, email, displayName } = await firebase.auth().currentUser;
            
            let newPhoto = {
                url: downloadURL,
                userName: displayName,
                userId: uid,
                email,
                bucket,
                fullPath
            }
            
            console.log('newPhoto', newPhoto);
            
            let photoAdded = await firebase.firestore().collection('photos').add(newPhoto);
            console.log('photoAdded', photoAdded);
            
        }
        
        catch(err) {
            console.error(err);
        }
    }
    
    render() {
        
        
        
        
        const allImages = this.state.allPhotos.map(photo => {
            
           

            if (photo.labeldesc && photo.labeldesc.includes('Face')|| photo.labeldesc && photo.labeldesc.includes('Cheek')|| photo.labeldesc && photo.labeldesc.includes('Lip')||photo.labeldesc && photo.labeldesc.includes('Eyelash') || photo.labeldesc && photo.labeldesc.includes('Jaw')||photo.labeldesc && photo.labeldesc.includes('Eye')||photo.labeldesc && photo.labeldesc.includes('Nose')) {
              
                return (
                    <div key={photo.id}>
                      <div style={{minHeight: '215px'}}>
                        <i onClick={() => this.handleRemove(photo.id)} className="bottom-icon material-icons main-close">close</i>
                        <Image style={{ margin: '120px auto 60px', width: '70%', borderRadius: '10px' }} src={photo.url} responsive="true" />
                      </div>
                    </div>
                  );
            } else {
                console.log('No face')
                
                    
            }
            
          
        })
        
      
        

		return (
			 <div className="home">
                
                <h1>My Photo Feed</h1>
                <h5> Upload a photo of your face then scroll</h5>
                
                
                {allImages}
                
                <Container className="bottom-nav">
                    <Row>
                       
                        <Col xs={4} className="col-bottom">
                            <label>
                                <i className="bottom-icon material-icons">camera_alt</i>
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    storageRef={firebase.storage().ref(this.state.imageRef)}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                    />
                            </label>
                            
                        </Col>
                        
                        <Col onClick={ () => auth.signOut()} xs={4} className="col-bottom">
                            <i className="bottom-icon material-icons">logout</i>
                        </Col>
                    
                    </Row>
                
                </Container>
        </div>
		);
	}

        
}
        
        


export default Home;