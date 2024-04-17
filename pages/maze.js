// Define the maze layout
const mazeLayout = [
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "xooooooooooxooooooooooxoooooooooox",
    "x xx xxxxxxxxxxxx xxxxxxxxxxxx xx x",
    "x xx xxxxxxxxxxxx xxxxxxxxxxxx xx x",
    "x xx x xxxxxxxxx xxxxxxxxx x xx x",
    "x         x                 x         x",
    "x xx x xx xxxxx xxxxx xx x xx x",
    "x xx x xx xxxxx xxxxx xx x xx x",
    "x     x              x              x",
    "xxxx x xxxxxxxxxxxx xxxxxxxxxxx x xxxx",
    "xxxx x xxxxxxxxxxxx xxxxxxxxxxx x xxxx",
    "xxxx x xxxxxxxxxxxx xxxxxxxxxxx x xxxx",
    "xxxx x                          x xxxx",
    "xxxx x xxxxxxxxxxxx xxxxxxxxxxx x xxxx",
    "xxxx x xxxxxxxxxxxx xxxxxxxxxxx x xxxx",
    "x              x xxxxxxx x              x",
    "x xx xxxxxxxxx x xxxxxxx x xxxxxxxxx xx x",
    "x xx xxxxxxxxx x xxxxxxx x xxxxxxxxx xx x",
    "x xx xxxxxxxxx x         x xxxxxxxxx xx x",
    "x         x         x         x         x",
    "x xx x xx xxxxx xxxxx xx x xx x",
    "x xx x xx xxxxx xxxxx xx x xx x",
    "xooooooooooxooooooooooxoooooooooox",
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
];




// Function to create maze elements
function createMaze() {
    const mazeElement = document.getElementById('maze');
    for (let y = 0; y < mazeLayout.length; y++) {
        for (let x = 0; x < mazeLayout[y].length; x++) {
            const cellType = mazeLayout[y][x];
            if (cellType === 'x') {
                const wall = document.createElement('div');
                wall.classList.add('wall');
                wall.style.left = `${x * 30}px`;
                wall.style.top = `${y * 30}px`;
                mazeElement.appendChild(wall);
            } else if (cellType === 'o') {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.left = `${x * 30 + 12}px`;
                dot.style.top = `${y * 30 + 12}px`;
                mazeElement.appendChild(dot);
            }
        }
    }
}

// Create the maze on page load
createMaze();
