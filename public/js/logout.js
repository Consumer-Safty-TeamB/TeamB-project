
const submitButton = document.getElementById('logout-btn')

//Send POST to API to add gas report
async function logout(e)
{
    e.preventDefault();
        try {
            const res = await fetch('/users/logout', {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json'
               }
            });
    
            if(res.status === 400){
                throw Error('Something went wrong! Please try again! ')
            }
            
            alert('You have successfully logged out!');
            window.location.href = '/login.html';    
        } catch (err) {
            alert(err);
            return;
        }
}

window.onload=function(){
    submitButton.addEventListener('click', logout);
}
