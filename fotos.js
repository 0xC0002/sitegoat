const audio = document.getElementById("site-music-audio");
const playButton = document.getElementById("music-toggle");
const volumeButton = document.getElementById("music-volume");
const progress = document.getElementById("music-progress");
const timeLabel = document.getElementById("music-time");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}
function updateMusic() {
  timeLabel.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  playButton.textContent = audio.paused ? "▶" : "Ⅱ";
}
playButton.addEventListener("click", async () => {
  if (audio.paused) { try { await audio.play(); } catch (_) {} } else audio.pause();
  updateMusic();
});
audio.addEventListener("loadedmetadata", updateMusic);
audio.addEventListener("timeupdate", updateMusic);
audio.addEventListener("play", updateMusic);
audio.addEventListener("pause", updateMusic);
progress.addEventListener("input", () => { if (audio.duration) audio.currentTime = Number(progress.value) / 100 * audio.duration; });
volumeButton.addEventListener("click", () => { audio.muted = !audio.muted; volumeButton.textContent = audio.muted ? "×" : "♪"; });
document.addEventListener("pointerdown", () => { if (audio.paused) audio.play().catch(() => {}); }, { once:true });
updateMusic();
