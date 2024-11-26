
const expenselist=document.getElementById('expenselist');
const paginationContainer = document.getElementById('pagination');
let currentPage = 1;
let totalPages = 1;
let itemsPerPage = 5;

function changeItemsPerPage() {
    itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
    localStorage.setItem('itemsPerPage', JSON.stringify(itemsPerPage)) ;
    currentPage = 1;  
    loadExpenses();
}

const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', () => {
    if (!token) {
        console.error('No token found');
    }
    loadExpenses(currentPage);
});


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
    axios.post(`http://127.0.0.1:3000/expense/addexpense`,expense,{headers: { 'Authorization': `Bearer ${token}` }})
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
            localStorage.removeItem('user');
            localStorage.setItem('user',true);
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

function download(){
    const token=localStorage.getItem('token');
    axios.get('http://localhost:3000/premium/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        alert(err.response.data.message);
       console.log(err);
    });
}

function loadExpenses(page) {
    let itemsPerPage=JSON.parse(localStorage.getItem('itemsPerPage'));
    axios.get(`http://127.0.0.1:3000/expense/getexpense?page=${page}&limit=${itemsPerPage}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(result => {
        const { expenses, totalExpenses, totalPages } = result.data;

        // Set totalPages dynamically
        window.totalPages = totalPages;

        // Clear existing expense list
        expenselist.innerHTML = '';

        // Add expenses to the list
        expenses.forEach(expense => {
            addtolist(expense);
        });

        // Render pagination controls
        renderPagination(currentPage, totalPages);
    })
    .catch(err => console.log(err));
}


// Render pagination controls (Previous, Next, and page numbers)
function renderPagination(currentPage, totalPages) {
    if(paginationContainer!==null)
    {
    paginationContainer.innerHTML = ''; // Clear existing pagination
    }

    // Previous Button
    const prevButton = document.createElement('li');
    prevButton.className = "page-item";
    const prevLink = document.createElement('a');
    prevLink.className = "page-link";
    prevLink.textContent = "Previous";
    prevLink.href = "#";
    prevLink.onclick = () => changePage(currentPage - 1);
    prevButton.appendChild(prevLink);
    prevButton.classList.toggle('disabled', currentPage === 1);
    paginationContainer.appendChild(prevButton);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('li');
        pageButton.className = "page-item";
        const pageLink = document.createElement('a');
        pageLink.className = "page-link";
        pageLink.textContent = i;
        pageLink.href = "#";
        pageLink.onclick = () => changePage(i);
        pageButton.appendChild(pageLink);
        pageButton.classList.toggle('active', i === currentPage);
        paginationContainer.appendChild(pageButton);
    }

    // Next Button
    const nextButton = document.createElement('li');
    nextButton.className = "page-item";
    const nextLink = document.createElement('a');
    nextLink.className = "page-link";
    nextLink.textContent = "Next";
    nextLink.href = "#";
    nextLink.onclick = () => changePage(currentPage + 1);
    nextButton.appendChild(nextLink);
    nextButton.classList.toggle('disabled', currentPage === totalPages);
    paginationContainer.appendChild(nextButton);
}

// Change page when a user clicks a pagination button
function changePage(page) {
    if (page > 0 && page <= totalPages) {
        currentPage = page;
        loadExpenses(currentPage);
    }
}
