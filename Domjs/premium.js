

const leaderboard=document.getElementById('leadlist');
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

document.getElementById('ldrbrd-button').onclick = async function(e) {
    try {
        const leadlist=await axios.get(`http://127.0.0.1:3000/premium/leaderboard`)
        const leads=leadlist.data;
        if(leaderboard!=null)
        {
            leaderboard.innerHTML='';
        }
        leads.forEach(lead => {
            addtoleaderboard(lead);
        })
    } catch (error) {
        console.log(error);
    }
}

function addtoleaderboard(lead){
    const newli=document.createElement('li');
    newli.className="list-group-item";
    newli.textContent=`Name:${lead.name}-Expense:${lead.totalexpense}`;
    leaderboard.appendChild(newli);
}

function download(){
    const token=localStorage.getItem('token');
    axios.get('http://localhost:3000/premium/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 200){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        showError(err)
    });
}

function downloadedfiles(){
    console.log('calling axios toget download list');
    const token=localStorage.getItem('token');
    axios.get('http://localhost:3000/premium/downloadedfiles', { headers: {"Authorization" : token} })
    .then((response) => {
        const links=response.data;
        if(links.length>0)
        {
            const downloadlinks=document.getElementById('downloads');
            if(downloadlinks!==null)
            {
                downloadlinks.innerHTML='';
            }
            links.forEach(link => {
                const newli=document.createElement('li');
                newli.textContent=`Date:${link.createdAt}`;
                var a = document.createElement("a");
                a.href = link.links;
                a.textContent=`Download file`
                newli.appendChild(a);
                downloadlinks.appendChild(newli);
            })
        }
        else
        {
            alert('No links to download');
        }
    }
    )
    .catch((err) => {
        console.log(err);
    });
}
