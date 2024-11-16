
function signUp(event) {
    event.preventDefault();
    const name=document.getElementById('username').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    if(!name || !email || !password)
    {
        alert('Please fill required fields');
    }
    const user= {
        name,
        email,
        password
    }
    axios.post('http://127.0.0.1:3000/user/signup', user)
    .then(res => {
        console.log(res);
    })
    .catch(err => console.log(err));
}

module.exports=signUp;