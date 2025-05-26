class EventHandler {
    listeners = {}
    addListener(event, func){
        if(!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(func)
    }
    callEvent(event, props){
        if(this.listeners[event]) this.listeners[event].forEach(func => func(props));
    }
    unsubscribe(event, func){

    }
}

window.eventHandler = new EventHandler();