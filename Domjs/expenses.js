

const expenselist=document.getElementById('expenselist');

window.addEventListener('DOMContentLoaded', ()=>{
    const token=localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
      }
    axios.get('http://127.0.0.1:3000/expense/getexpense',{headers: { 'Authorization': `Bearer ${token}` }})
    .then(result => {
        const expenses=result.data;
        console.log(expenses);
        if(expenses!=null)
        {
            expenses.forEach(expense => {
                addtolist(expense);
            })
        }        
    })
    .catch(err => console.log(err));
})

function addDailyexpense(event) {
    event.preventDefault();
    const token=localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
      }
    const amount=document.getElementById('amount').value;
    const description=document.getElementById('description').value;
    const category= document.getElementById('category').value;
    const expense={
        amount,
        description,
        category
    }
    axios.post('http://127.0.0.1:3000/expense/addexpense',expense,{headers: { 'Authorization': `Bearer ${token}` }})
    .then(result => {
        if(result.status===200)
        {
            const newexpense=result.data;
            addtolist(newexpense);
            document.querySelector('form').reset();
        }  
    })
    .catch(error=> {
        console.log(error);
    });
}

function addtolist(expense){
    const newli=document.createElement('li');
    newli.className="list-group-item";
    newli.textContent=`${expense.amount}-${expense.description}-${expense.category}`
    const dltbtn=document.createElement('button');
    dltbtn.type="button"
    dltbtn.className='delete-btn';
    dltbtn.textContent="Delete";
    dltbtn.onclick= () => deleteexpense(newli,expense.id);
    newli.appendChild(dltbtn);
    expenselist.appendChild(newli);
}

function deleteexpense(listitem, id){
  axios.delete(`http://127.0.0.1:3000/expense/delete/${id}`)
  .then(res => {
    if(res.status===204)
    {
        expenselist.removeChild(listitem);
    } 
  })
  .catch(err => console.log(err));
}

document.getElementById('rzp-button').onclick = async function(e) {
    const token=localStorage.getItem('token');
    console.log("Purhasing premium request about to send");
    const response= await axios.get(`http://127.0.0.1:3000/purchase/premiummembership`, {headers: { 'Authorization': `Bearer ${token}` }})
    console.log(response);
    var options ={
        key:response.data.key_id,
        order_id:response.data.order.id,
        handler: async function(response){
            console.log("success handler");
            await axios.post(`http://127.0.0.1:3000/purchase/updatetransactionstatus`, {
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            }, {headers: { 'Authorization': `Bearer ${token}` }})
            alert('You are a Premium User Now');
            window.location.href='/expense/premium';
        },
    };
    const rzp1= new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function(response){
        console.log(response);
        alert('Something went wrong');
    })
}