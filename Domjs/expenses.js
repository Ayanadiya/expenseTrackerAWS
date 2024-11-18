
function addDailyexpense(event) {
    event.preventDefault();
    const amount=document.getElementById('amount').value;
    const description=document.getElementById('description').value;
    const category= document.getElementById('category').value;
    const expense={
        amount,
        description,
        expense
    }
    axios.post('http://127.0.0.1:3000/expense/addexpense', expense)
    .then(result => {
        if(result.status===200)
        {
            alert(result.data.message);
            window.location.href='http://127.0.0.1:3000/expense';
        }  
    })
    .catch(error=> {
        console.log(error);
    });
}