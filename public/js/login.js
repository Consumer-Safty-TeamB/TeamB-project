const submitButton = document.getElementById('signin-btn')
const email = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');

//Send POST to API to add gas report
async function signin(e)
{
    e.preventDefault();

    if(userPassword.value ==''|| email == '')
    {
        alert('Please fill in fields');
    }
    else if (userPassword.value != confirmUserPassword.value){
        alert('Your passwords do not match! type in correct passwords')
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
                'Content-Type': 'application/json',
                // 'Authorization', document.cookie
               } ,
               body: JSON.stringify(sendBody)
            });
    
            if(res.status === 400){
                throw Error('Something went wrong! Please try again! ')
            }
            
            data = await res.json();
            const jwtToken = data.token;
            document.cookie = 'jwt=' + jwtToken;

            console.log(document.cookie)

            alert('You have successfully loged in!');

    
        } catch (err) {
            alert(err);
            return;
        }
    }


}

submitButton.addEventListener('click', signin);