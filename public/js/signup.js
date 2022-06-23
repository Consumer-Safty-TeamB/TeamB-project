
const submitButton = document.getElementById('signup-btn')
const userName = document.getElementById('userName');
const userPassword = document.getElementById('userPassword');
const confirmUserPassword = document.getElementById('confirmUserPassword');
const email = document.getElementById('userEmail');

//Send POST to API to add gas report
async function signup(e)
{
    e.preventDefault();

    if(userName.value =='' || userPassword.value ==''|| email == '')
    {
        alert('Please fill in fields');
    }
    else if (userPassword.value != confirmUserPassword.value){
        alert('Your passwords do not match! type in correct passwords')
    }
    else
    {
        const sendBody = {
            name : userName.value,
            email : userEmail.value,
            password: userPassword.value
        }
    
        try {
            const res = await fetch('/users/signup', {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json'
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

            alert('You have successfully signed up!');

    
        } catch (err) {
            alert(err);
            return;
        }
    }


}

submitButton.addEventListener('click', signup);