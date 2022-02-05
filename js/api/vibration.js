
//vibration lors d'une victoire
const vibrationWin = () => {
  if (window.navigator.vibrate) {
    window.navigator.vibrate([100, 100, 100]);
  } else {
    // Le navigateur ne supporte pas l'événement de vibration
  }
};

// vibration lors d'une défaite
const vibrationLose =  () => {
  if (window.navigator.vibrate) {
    window.navigator.vibrate([300, 200, 100, 50, 50]);
  } else {
    // Le navigateur ne supporte pas l'événement de vibration
  }
};

// vibration lors du tirage d'une carte
const vibrationAddingCard = () => {
  if (window.navigator.vibrate) {
    window.navigator.vibrate(100);
  } else {
    // Le navigateur ne supporte pas l'événement de vibration
  }
};

//stop les vibrations
const vibrationStop = () => {
  if (vibrateInterval) clearInterval(vibrateInterval);
  navigator.vibrate(0);
};


export { vibrationWin, vibrationLose, vibrationAddingCard, vibrationStop };