const submitButton = document.getElementById('login-btn')
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');

//Send POST to API to add gas report
async function signin(e)
{
    e.preventDefault();

    if(userPassword.value ==''|| userEmail == '')
    {
        alert('Please fill in fields');
    }
    
    else
    {
        const sendBody = {
            email : userEmail.value,
            password: userPassword.value
        }
    
        try {
            const res = await fetch('/users/login', {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json'
               } ,
               body: JSON.stringify(sendBody)
            });
    
            if(res.status === 400){
                throw Error('Something went wrong! Please try again! ')
            }
            
            alert('You have successfully loged in!');
            window.location.href = '/index.html';

    
        } catch (err) {
            alert(err);
            return;
        }
    }


}

window.onload=function(){
    submitButton.addEventListener('click', signin);
}
