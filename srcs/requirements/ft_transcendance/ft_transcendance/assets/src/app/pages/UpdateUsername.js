
// const updateUsername = (newUsername) => {
//     console.log("Update Username");
//     put('https://localhost/api/users/update-username/', { username: newUsername })
//         .then(response => {
//             if (response.ok) {
//                 return response.json().then(updateData => {
//                     document.querySelector('#username-display').textContent = updateData.username;
//                     alert('Username updated successfully');
//                 });
//             } else {
//                 return response.json().then(errorData => {
//                     alert(`Error: ${errorData.error || 'Failed to update username'}`);
//                 });
//             }
//         })
//         .catch(error => {
//             console.error('Error updating username:', error);
//             alert('An error occurred while updating the username');
//         });
// };


// export const UpdateUsername = (appDiv) => {
// 	appDiv.innerHTML = `
//         <div class="container">
//             <h1>Modifier Nom d'Utilisateur</h1>
//             <form id="username-form">
//                 <div class="mb-3">
//                     <label for="new-username" class="form-label">Nouveau Nom d'Utilisateur</label>
//                     <input type="text" class="form-control" id="new-username" required>
//                 </div>
//                 <button type="submit" class="btn btn-primary">Enregistrer</button>
//             </form>
//         </div>
//     `;

// 	document.getElementById('username-form').addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const newUsername = document.getElementById('new-username').value;
//         try {
//             await updateUsername(newUsername);
//             alert('Nom d\'utilisateur mis à jour avec succès');
//             window.location.hash = '#/settings';
//         } catch (error) {
//             console.error('Error updating username:', error);
//             alert('Une erreur est survenue lors de la mise à jour du nom d\'utilisateur');
//         }
//     });
// };
