document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Navbar Background Effect on Scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 5, 5, 0.85)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(5, 5, 5, 0.7)';
            nav.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: Stop observing to only animate once
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });

    // Form Submission Handling (Prevent default for demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            // Simulate sending state
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            setTimeout(() => {
                btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    // AI Assistant Logic
    const aiTopicInput = document.getElementById('aiTopicInput');
    const aiGenerateBtn = document.getElementById('aiGenerateBtn');
    const aiChatArea = document.getElementById('aiChatArea');

    if (aiTopicInput && aiGenerateBtn && aiChatArea) {
        const generateAIResponse = (topic) => {
            // Simulated AI processing time
            setTimeout(() => {
                // Remove typing indicator
                const typingMsg = document.getElementById('typingMsg');
                if (typingMsg) typingMsg.remove();

                // Generate contextual advice
                const keywords = topic.toLowerCase();
                let advice = '';

                if (keywords.includes('react') || keywords.includes('frontend') || keywords.includes('css') || keywords.includes('html') || keywords.includes('javascript')) {
                    advice = `
                        <strong>Frontend Roadmap Tip:</strong><br>
                        Mastering <em>${topic}</em> requires building components. Start with the basics:
                        <ul style="margin-top: 10px; padding-left: 20px;">
                            <li>Understand state and lifecycle.</li>
                            <li>Build 3 mini-projects (e.g., calculator, weather app).</li>
                            <li>Learn modern CSS (Grid, Flexbox, Variables).</li>
                        </ul>
                        <br><em>Motivation:</em> Every expert was once a beginner. Keep breaking down the UI!
                    `;
                } else if (keywords.includes('python') || keywords.includes('backend') || keywords.includes('api') || keywords.includes('node')) {
                    advice = `
                        <strong>Backend Mastery Tip:</strong><br>
                        For <em>${topic}</em>, focus on data flow and architecture.
                        <ul style="margin-top: 10px; padding-left: 20px;">
                            <li>Learn how RESTful APIs work.</li>
                            <li>Understand databases (SQL vs NoSQL).</li>
                            <li>Write clean, modular functions.</li>
                        </ul>
                        <br><em>Motivation:</em> You are the architect of the system. Build a strong foundation!
                    `;
                } else if (keywords.includes('ai') || keywords.includes('machine learning') || keywords.includes('data')) {
                    advice = `
                        <strong>AI & Data Science Insight:</strong><br>
                        Diving into <em>${topic}</em> is exciting! Here is a starting path:
                        <ul style="margin-top: 10px; padding-left: 20px;">
                            <li>Brush up on statistics and linear algebra.</li>
                            <li>Master Python data libraries (Pandas, NumPy).</li>
                            <li>Build a simple classification model.</li>
                        </ul>
                        <br><em>Motivation:</em> The future is data-driven, and you are learning to steer it!
                    `;
                } else {
                    advice = `
                        <strong>Study Blueprint for: ${topic}</strong><br>
                        Here is a universal framework to tackle this:
                        <ul style="margin-top: 10px; padding-left: 20px;">
                            <li><strong>Deconstruct:</strong> Break the topic into 3 smaller sub-topics.</li>
                            <li><strong>Practice:</strong> Spend 80% of your time doing, 20% reading.</li>
                            <li><strong>Teach:</strong> Explain it to someone else (or a rubber duck).</li>
                        </ul>
                        <br><em>Motivation:</em> Consistency beats intensity. 1 hour a day will get you there!
                    `;
                }

                aiChatArea.innerHTML = `
                    <div class="ai-message system-msg">
                        <div class="msg-avatar"><i class="fas fa-sparkles"></i></div>
                        <div class="msg-content">
                            ${advice}
                        </div>
                    </div>
                `;
            }, 1500);
        };

        const handleGenerate = () => {
            const topic = aiTopicInput.value.trim();
            if (!topic) return;

            aiTopicInput.value = '';

            // Set loading state in output card
            aiChatArea.innerHTML = `
                <div class="ai-message system-msg">
                    <div class="msg-avatar"><i class="fas fa-robot"></i></div>
                    <div class="msg-content">Analyzing topic and generating custom roadmap for "${topic}"... <i class="fas fa-spinner fa-spin"></i></div>
                </div>
            `;

            // Generate response
            generateAIResponse(topic);
        };

        aiGenerateBtn.addEventListener('click', handleGenerate);
        aiTopicInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleGenerate();
        });
    }

    // Mini Game Logic (Advanced Pac-Man Engine)
    const canvas = document.getElementById('pacmanCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const scoreElement = document.getElementById('gameScore');
    const restartBtn = document.getElementById('restartGameBtn');
    const overlay = document.getElementById('gameOverOverlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlaySubtitle = document.getElementById('overlaySubtitle');
    const overlayRestartBtn = document.getElementById('overlayRestartBtn');

    if (canvas && ctx) {
        const TILE_SIZE = 20;
        const ROWS = 20;
        const COLS = 20;
        
        let score = 0;
        let gameLoop;
        let gameState = 'START'; // START, PLAYING, GAME_OVER, WIN
        let powerModeTime = 0;
        let mouthOpen = 0;
        let mouthDir = 1;
        
        // 1 = wall, 0 = dot, 2 = empty, 3 = power pellet
        const initialMap = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,3,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,3,1],
            [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
            [1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1],
            [1,1,1,1,0,1,1,1,2,1,1,2,1,1,1,0,1,1,1,1],
            [2,2,2,1,0,1,2,2,2,2,2,2,2,2,1,0,1,2,2,2],
            [1,1,1,1,0,1,2,1,1,2,2,1,1,2,1,0,1,1,1,1],
            [0,0,0,0,0,2,2,1,2,2,2,2,1,2,2,0,0,0,0,0],
            [1,1,1,1,0,1,2,1,1,1,1,1,1,2,1,0,1,1,1,1],
            [2,2,2,1,0,1,2,2,2,2,2,2,2,2,1,0,1,2,2,2],
            [1,1,1,1,0,1,2,1,1,1,1,1,1,2,1,0,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
            [1,3,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,3,1],
            [1,1,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,1],
            [1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        let map = [];
        let totalDots = 0;
        let player = { x: 1, y: 1, dx: 0, dy: 0, nextDx: 0, nextDy: 0, speed: 2, size: 8 };
        let ghosts = [];
        const ghostColors = ['#ef4444', '#ec4899', '#8b5cf6']; // Red, Pink, Purple

        function initGame() {
            map = JSON.parse(JSON.stringify(initialMap));
            score = 0;
            totalDots = 0;
            powerModeTime = 0;
            scoreElement.textContent = score;
            gameState = 'PLAYING';
            
            overlay.classList.add('hidden');
            overlay.className = 'game-overlay hidden'; // reset states
            
            // Count dots for win condition
            for(let r=0; r<ROWS; r++){
                for(let c=0; c<COLS; c++){
                    if(map[r][c] === 0 || map[r][c] === 3) totalDots++;
                }
            }
            
            // Player starts near top left
            player = { x: 1 * TILE_SIZE, y: 1 * TILE_SIZE, dx: 1, dy: 0, nextDx: 1, nextDy: 0, speed: 2, size: 8 };
            
            // Ghosts start in the middle box area
            ghosts = [
                { x: 9 * TILE_SIZE, y: 9 * TILE_SIZE, dx: 0, dy: -1, speed: 2, color: ghostColors[0], isScared: false },
                { x: 10 * TILE_SIZE, y: 9 * TILE_SIZE, dx: 0, dy: -1, speed: 2, color: ghostColors[1], isScared: false },
                { x: 9 * TILE_SIZE, y: 10 * TILE_SIZE, dx: 1, dy: 0, speed: 2, color: ghostColors[2], isScared: false }
            ];

            if(gameLoop) cancelAnimationFrame(gameLoop);
            requestAnimationFrame(update);
        }

        function showOverlay(title, subtitle, stateClass) {
            gameState = stateClass === 'win-state' ? 'WIN' : 'GAME_OVER';
            overlayTitle.textContent = title;
            overlaySubtitle.textContent = subtitle;
            overlay.className = `game-overlay ${stateClass}`;
            if(gameLoop) cancelAnimationFrame(gameLoop);
        }

        window.addEventListener('keydown', function(e) {
            if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                const rect = canvas.getBoundingClientRect();
                // Prevent default scroll if canvas is visible
                if(rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    e.preventDefault();
                }
                
                if (e.key === 'ArrowLeft') { player.nextDx = -1; player.nextDy = 0; }
                if (e.key === 'ArrowRight') { player.nextDx = 1; player.nextDy = 0; }
                if (e.key === 'ArrowUp') { player.nextDx = 0; player.nextDy = -1; }
                if (e.key === 'ArrowDown') { player.nextDx = 0; player.nextDy = 1; }
            }
        }, false);

        restartBtn.addEventListener('click', initGame);
        overlayRestartBtn.addEventListener('click', initGame);

        function getMapCell(row, col) {
            if (row < 0 || row >= ROWS) return 1;
            if (col < 0) col = COLS - 1;
            if (col >= COLS) col = 0;
            return map[row][col];
        }

        function update() {
            if (gameState !== 'PLAYING') return;

            // --- Power Mode Timer ---
            if (powerModeTime > 0) {
                powerModeTime--;
                if (powerModeTime === 0) {
                    ghosts.forEach(g => {
                        g.isScared = false;
                        g.speed = 2;
                    });
                }
            }

            // --- Player Movement & Buffering ---
            // Allow instant 180 turn anywhere
            if (player.nextDx === -player.dx && player.nextDy === -player.dy) {
                player.dx = player.nextDx;
                player.dy = player.nextDy;
            }

            if (player.x % TILE_SIZE === 0 && player.y % TILE_SIZE === 0) {
                let pCol = player.x / TILE_SIZE;
                let pRow = player.y / TILE_SIZE;

                if (getMapCell(pRow + player.nextDy, pCol + player.nextDx) !== 1) {
                    player.dx = player.nextDx;
                    player.dy = player.nextDy;
                }

                if (getMapCell(pRow + player.dy, pCol + player.dx) === 1) {
                    player.dx = 0;
                    player.dy = 0;
                }
            }

            player.x += player.dx * player.speed;
            player.y += player.dy * player.speed;

            if (player.x < -TILE_SIZE/2) player.x = canvas.width;
            if (player.x > canvas.width) player.x = -TILE_SIZE/2;

            // --- Eating Logic ---
            const pCol = Math.floor((player.x + TILE_SIZE/2) / TILE_SIZE);
            const pRow = Math.floor((player.y + TILE_SIZE/2) / TILE_SIZE);
            
            if (pRow >= 0 && pRow < ROWS && pCol >= 0 && pCol < COLS) {
                if (map[pRow][pCol] === 0) {
                    map[pRow][pCol] = 2; // set empty
                    score += 10;
                    totalDots--;
                } else if (map[pRow][pCol] === 3) {
                    map[pRow][pCol] = 2;
                    score += 50;
                    totalDots--;
                    powerModeTime = 600; // ~10 seconds at 60fps
                    ghosts.forEach(g => {
                        g.isScared = true;
                        g.speed = 1.0; // Slower when frightened
                        g.dx = -g.dx; // Reverse direction immediately
                        g.dy = -g.dy;
                    });
                }
                scoreElement.textContent = score;

                if (totalDots === 0) {
                    showOverlay("SYSTEM BREACHED!", "All data collected successfully.", "win-state");
                    return;
                }
            }

            // --- Ghost Movement & AI ---
            ghosts.forEach(g => {
                if (g.x % TILE_SIZE === 0 && g.y % TILE_SIZE === 0) {
                    const possibleMoves = [];
                    const directions = [ {dx:1,dy:0}, {dx:-1,dy:0}, {dx:0,dy:1}, {dx:0,dy:-1} ];
                    let gCol = g.x / TILE_SIZE;
                    let gRow = g.y / TILE_SIZE;
                    
                    directions.forEach(dir => {
                        if (dir.dx === -g.dx && dir.dy === -g.dy && (g.dx !== 0 || g.dy !== 0)) return;
                        if (getMapCell(gRow + dir.dy, gCol + dir.dx) !== 1) {
                            possibleMoves.push(dir);
                        }
                    });

                    if (possibleMoves.length > 0) {
                        let move;
                        if (!g.isScared && Math.random() < 0.4) {
                            move = possibleMoves.reduce((best, curr) => {
                                const currDist = Math.hypot((g.x + curr.dx*TILE_SIZE) - player.x, (g.y + curr.dy*TILE_SIZE) - player.y);
                                const bestDist = Math.hypot((g.x + best.dx*TILE_SIZE) - player.x, (g.y + best.dy*TILE_SIZE) - player.y);
                                return currDist < bestDist ? curr : best;
                            });
                        } else {
                            move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                        }
                        g.dx = move.dx;
                        g.dy = move.dy;
                    } else {
                        g.dx = -g.dx;
                        g.dy = -g.dy;
                    }
                }

                g.x += g.dx * g.speed;
                g.y += g.dy * g.speed;

                if (g.x < -TILE_SIZE/2) g.x = canvas.width;
                if (g.x > canvas.width) g.x = -TILE_SIZE/2;

                // --- Ghost Collision ---
                const dist = Math.hypot((player.x - g.x), (player.y - g.y));
                if (dist < TILE_SIZE * 0.8) {
                    if (g.isScared) {
                        // Eat ghost
                        score += 200;
                        scoreElement.textContent = score;
                        g.x = 9 * TILE_SIZE;
                        g.y = 9 * TILE_SIZE;
                        g.isScared = false;
                        g.speed = 2;
                    } else {
                        showOverlay("CONNECTION LOST", "The bugs corrupted your data.", "lose-state");
                    }
                }
            });

            // Mouth animation
            mouthOpen += 0.15 * mouthDir;
            if (mouthOpen >= 0.6 || mouthOpen <= 0) mouthDir *= -1;

            draw();
            if (gameState === 'PLAYING') {
                gameLoop = requestAnimationFrame(update);
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Map
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    if (map[r][c] === 1) {
                        ctx.fillStyle = 'rgba(99, 102, 241, 0.15)'; 
                        ctx.strokeStyle = '#6366f1'; 
                        ctx.lineWidth = 1.5;
                        ctx.shadowBlur = 5;
                        ctx.shadowColor = '#6366f1';
                        ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                        ctx.strokeRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                        ctx.shadowBlur = 0;
                    } else if (map[r][c] === 0) {
                        ctx.fillStyle = '#fbbf24'; 
                        ctx.beginPath();
                        ctx.arc(c * TILE_SIZE + TILE_SIZE/2, r * TILE_SIZE + TILE_SIZE/2, 2, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (map[r][c] === 3) {
                        ctx.fillStyle = '#c084fc'; 
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = '#c084fc';
                        ctx.beginPath();
                        ctx.arc(c * TILE_SIZE + TILE_SIZE/2, r * TILE_SIZE + TILE_SIZE/2, 5 + Math.sin(Date.now() / 200) * 1.5, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }
                }
            }

            // Draw Player
            ctx.save();
            ctx.translate(player.x + TILE_SIZE/2, player.y + TILE_SIZE/2);
            
            // Rotate based on direction
            if (player.dx === 1) ctx.rotate(0);
            else if (player.dx === -1) ctx.rotate(Math.PI);
            else if (player.dy === 1) ctx.rotate(Math.PI / 2);
            else if (player.dy === -1) ctx.rotate(-Math.PI / 2);

            ctx.fillStyle = '#facc15'; 
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#facc15';
            ctx.beginPath();
            const angle = Math.max(0, mouthOpen); // prevent negative glitch
            ctx.arc(0, 0, player.size, angle * Math.PI, (2 - angle) * Math.PI, false);
            ctx.lineTo(0, 0);
            ctx.fill();
            ctx.restore();

            // Draw Ghosts
            ghosts.forEach(g => {
                ctx.fillStyle = g.isScared ? '#3b82f6' : g.color; // Blue if scared
                ctx.shadowBlur = 10;
                ctx.shadowColor = g.isScared ? '#3b82f6' : g.color;
                
                ctx.beginPath();
                // Wobble effect for bottom of ghost
                const wobble = Math.sin(Date.now() / 150 + g.x) * 2;
                ctx.arc(g.x + TILE_SIZE/2, g.y + TILE_SIZE/2, player.size, Math.PI, 0);
                ctx.lineTo(g.x + TILE_SIZE/2 + player.size, g.y + TILE_SIZE/2 + player.size + wobble);
                ctx.lineTo(g.x + TILE_SIZE/2, g.y + TILE_SIZE/2 + player.size - wobble);
                ctx.lineTo(g.x + TILE_SIZE/2 - player.size, g.y + TILE_SIZE/2 + player.size + wobble);
                ctx.fill();
                
                // Eyes
                ctx.shadowBlur = 0;
                ctx.fillStyle = g.isScared ? '#f87171' : '#fff'; // Red eyes if scared
                ctx.beginPath();
                ctx.arc(g.x + TILE_SIZE/2 - 3, g.y + TILE_SIZE/2 - 2, 2.5, 0, Math.PI*2);
                ctx.arc(g.x + TILE_SIZE/2 + 3, g.y + TILE_SIZE/2 - 2, 2.5, 0, Math.PI*2);
                ctx.fill();
            });
        }

        function showStartScreen() {
            gameState = 'START';
            overlayTitle.textContent = 'Pac-Man';
            overlaySubtitle.textContent = 'Ready to play?';
            overlay.className = 'game-overlay';
            
            // Draw initial state
            map = JSON.parse(JSON.stringify(initialMap));
            player = { x: 1 * TILE_SIZE, y: 1 * TILE_SIZE, dx: 1, dy: 0, nextDx: 1, nextDy: 0, speed: 2, size: 8 };
            ghosts = [
                { x: 9 * TILE_SIZE, y: 9 * TILE_SIZE, dx: 0, dy: -1, speed: 2, color: ghostColors[0], isScared: false },
                { x: 10 * TILE_SIZE, y: 9 * TILE_SIZE, dx: 0, dy: -1, speed: 2, color: ghostColors[1], isScared: false },
                { x: 9 * TILE_SIZE, y: 10 * TILE_SIZE, dx: 1, dy: 0, speed: 2, color: ghostColors[2], isScared: false }
            ];
            draw();
        }

        showStartScreen();
    }
});
