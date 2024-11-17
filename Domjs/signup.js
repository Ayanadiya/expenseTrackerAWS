
function signUp(event) {
    event.preventDefault();
    console.log('signup function triggered');
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
        if(res.status===201)
        {
            alert('Your account created Successfully')
        }
    })
    .catch(err => {
        if(err.status===400)
        {
            alert(err.response.data.message);
        }
        else
        {
            alert('Something went wrong. Please try again');
        }
    });
    document.querySelector('form').reset();
}

function login(event) {
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    if(!email || !password)
    {
        alert('Please fill required fields');
    }
    const user={
        email,
        password
    }
    axios.post('http://127.0.0.1:3000/user/login', user )
    .then(result => {
        alert(result.response.data.message);
    })
    .catch(err => console.log(err));
}

function getsignUp() {
    axios.get('http://127.0.0.1:3000/')
    .then(result => console.log(result))
    .catch(err => console.log(err))
}