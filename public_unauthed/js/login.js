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
// <!-- JavaScript Code (to Show Modal on Page Load) -->
// <script>
    document.addEventListener("DOMContentLoaded", function() {
        var myModal = new bootstrap.Modal(document.getElementById("myModal"));
        myModal.show();
    });

{/* <!-- Javascript to align model to center --> */}

    $(document).ready(function(){
        function alignModal(){
            var modalDialog = $(this).find(".modal-dialog");
            
            // Applying the top margin on modal to align it vertically center
            modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
        }
        // Align modal when it is displayed
        $(".modal").on("shown.bs.modal", alignModal);
        
        // Align modal when user resize the window
        $(window).on("resize", function(){
            $(".modal:visible").each(alignModal);
        });   
    });
    
window.onload=function(){
    submitButton.addEventListener('click', signin);
}
