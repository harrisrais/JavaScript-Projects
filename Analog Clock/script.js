function setClock() {
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
  
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
  
    const hourAngle = (hour * 30) + (minute * 0.5);
    const minuteAngle = minute * 6;
    const secondAngle = second * 6;
  
    hours.style.transform = `rotate(${hourAngle}deg)`;
    minutes.style.transform = `rotate(${minuteAngle}deg)`;
    seconds.style.transform = `rotate(${secondAngle}deg)`;
  
    setTimeout(setClock, 1000);
  }
  
  setClock();
  