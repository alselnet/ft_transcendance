
// const updateEmail = (newEmail) => {
//     console.log("Update Email");
//     put('https://localhost/api/users/update-email/', { email: newEmail })
//         .then(response => {
//             if (response.ok) {
//                 return response.json().then(updateData => {
//                     document.querySelector('#email-display').textContent = updateData.email;
//                     alert('Email updated successfully');
//                 });
//             } else {
//                 return response.json().then(errorData => {
//                     alert(`Error: ${errorData.error || 'Failed to update email'}`);
//                 });
//             }
//         })
//         .catch(error => {
//             console.error('Error updating email:', error);
//             alert('An error occurred while updating the email');
//         });
// };


// export const UpdateEmail = (appDiv) => {
// 	appDiv.innerHTML = `
//         <div class="container">
//             <h1>Modifier Adresse Mail</h1>
//             <form id="email-form">
//                 <div class="mb-3">
//                     <label for="new-email" class="form-label">Nouvelle Adresse Email</label>
//                     <input type="text" class="form-control" id="new-email" required>
//                 </div>
//                 <button type="submit" class="btn btn-primary">Enregistrer</button>
//             </form>
//         </div>
//     `;

// 	document.getElementById('email-form').addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const newEmail = document.getElementById('new-email').value;
//         try {
//             await updateEmail(newEmail);
//             alert('Adresse Mail mise à jour avec succès');
//             window.location.hash = '#/settings';
//         } catch (error) {
//             console.error('Error updating email:', error);
//             alert('Une erreur est survenue lors de la mise à jour de l\'adresse mail');
//         }
//     });
// };
