import React, { Component } from 'react';
import {Image, Container, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import {SignIn} from '../features/Login';



import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';




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
        
        
        this.isMobile = () => {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };
        
        this.state = {
            allPhotos: [],
            showModal: false,
            currentPhoto: '',
            isMobile: this.isMobile(),
            imageRef: ''
        };
        
        this.getInitial = this.getInitial.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
      
       
    }

    
    handleClose() {
        this.setState({
            showModal: false,
            currentPhoto: ''
        });
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
                console.log(photo.labeldesc)
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
                return (
                    <div key={photo.id}>
                        <div style={styles}>
                        <i onClick={() => this.handleRemove(photo.id)} className="bottom-icon material-icons main-close close">close</i>
                            <h5 style={{backgroundColor: 'black', top: "0"}}>Upload a picture of your face</h5>
                        </div>
                    </div>

                )
                    
            }
            
          
        })
        
      
        

		return (
			 <div className="home">
                
                <h1>My Photo Feed</h1>
                <h5> Upload a photo of your face then scroll</h5>
                
                {this.state.isMobile ? <h3> For sellfies - rotate to landscape</h3>: ""}
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