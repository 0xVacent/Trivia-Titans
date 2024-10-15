let playerCount = 0;
let usedColors = [];

document.getElementById('add-player-btn').addEventListener('click', function() {
    if (playerCount < 4) {
        playerCount++;

        const newPlayerDiv = document.createElement('div');
        newPlayerDiv.classList.add('player');
        newPlayerDiv.innerHTML = `
            <input type="text" placeholder="Player ${playerCount} Name" class="player-name">
            <div class="color-picker">
                <div class="color-option red" data-color="red"></div>
                <div class="color-option blue" data-color="blue"></div>
                <div class="color-option green" data-color="green"></div>
                <div class="color-option yellow" data-color="yellow"></div>
            </div>
            <button class="delete-btn">🗑️</button>
        `;

        const colorOptions = newPlayerDiv.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(o => o.classList.remove('selected'));

                const selectedColor = option.getAttribute('data-color');
                if (!usedColors.includes(selectedColor)) {
                    option.classList.add('selected');
                    usedColors.push(selectedColor);
                    disableUsedColors();
                }
            });
        });

        const deleteBtn = newPlayerDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            const selectedOption = newPlayerDiv.querySelector('.color-option.selected');
            if (selectedOption) {
                const colorToRemove = selectedOption.getAttribute('data-color');
                usedColors = usedColors.filter(color => color !== colorToRemove);
            }

            newPlayerDiv.remove();
            playerCount--;
            disableUsedColors();

            if (playerCount < 4) {
                document.getElementById('add-player-btn').style.display = 'block';
            }

            checkStartButtonVisibility(); // Revisar visibilidad del botón "Iniciar partida"
        });

        document.getElementById('players-container').appendChild(newPlayerDiv);

        if (playerCount === 4) {
            document.getElementById('add-player-btn').style.display = 'none';
        }

        checkStartButtonVisibility(); // Revisar visibilidad del botón "Iniciar partida"
    }
});

function disableUsedColors() {
    const allColorOptions = document.querySelectorAll('.color-option');
    allColorOptions.forEach(option => {
        const color = option.getAttribute('data-color');
        if (usedColors.includes(color)) {
            option.classList.add('disabled');
        } else {
            option.classList.remove('disabled');
        }
    });
}

// Función para verificar la visibilidad del botón "Iniciar partida"
function checkStartButtonVisibility() {
    const startGameBtn = document.getElementById('start-game-btn');
    
    if (playerCount >= 2) {
        startGameBtn.style.display = 'block'; // Mostrar el botón cuando hay 2 o más jugadores
    } else {
        startGameBtn.style.display = 'none'; // Ocultar si hay menos de 2 jugadores
    }
}