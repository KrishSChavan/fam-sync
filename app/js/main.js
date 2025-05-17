const socket = io();

const me = window.location.pathname.split('/').join('');


const my_events_list = document.getElementById('my-events');
const my_tasks_list = document.getElementById('my-tasks');
const my_cards_list = document.getElementById('my-cards');


function addEventToList(event, time) {
  const li_elem = document.createElement('li');
  li_elem.innerHTML = `<strong>${time}</strong> — ${event}`;
  my_events_list.appendChild(li_elem);
}


function addTaskToList(task) {
  const label_elem = document.createElement('label');
  label_elem.innerHTML = `<input type="checkbox"> ${task}`;
  my_tasks_list.appendChild(label_elem);
}


function addCardToList(title, description) {
  const section_elem = document.createElement('section');
  section_elem.innerHTML = `
    <section class="card">
      <h2>${title}</h2>
      <p>${description}</p>
    </section>`;
  my_cards_list.appendChild(section_elem);
}


socket.emit('request-data-for-person', me);

socket.on('data-for-person', (events, tasks, cards) => {

  console.log(events, tasks, cards);

  if (events.length > 0) {
    events.forEach((event) => {
      addEventToList(event.title, event.time);
    });
  }
  
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      addTaskToList(task.title);
    });
  }

  if (cards.length > 0) {
    cards.forEach((card) => {
      addCardToList(card.title, card.description);
    });
  }
});