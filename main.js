class Process{
    constructor(cycles) {
        this.cycles=cycles;
        this.next = null;
    }
}
class FIFO{
    constructor() {
        this.first = null;
    }
    add(newProcess){
        if (this.first == null) {
            this.first = newProcess;
        } else {
            let aux = this.first;
            while (aux.next != null) {
                aux = aux.next;
            }
            aux.next = newProcess;
        }
    }
    remove() {
        if(this.first == null){
            return null;
        } else {
            let aux = this.first;
            this.first = this.first.next;
            return aux;
        }
    }
    current() {
        return this.first;
    }
    list() {
        let str = '';
        let aux = this.first;
        while (aux.next != null) {
            str += aux.cycles + ', ';
            aux = aux.next;
        }
        return str;
    }
}
function Processor(cycles) {
    let emptyCycles = 0;
    let finishedProcesses = 0;
    let pendingProcesses = 0;
    let pendingCycles = 0;
    let processes = new FIFO();

    for (let i = 1; i < cycles; i++) {
        let random = Math.floor(Math.random() * 100 + 1);
        if(random <= 35){
            let cycles = Math.ceil(Math.random() * 14) + 4;
            let newProcess = new Process(cycles);
            processes.add(newProcess);
        }
        if (processes.current() != null) {
            processes.current().cycles--;
            if(processes.current().cycles == 0){
                finishedProcesses++;
                processes.remove();
            }
        } else {
            emptyCycles++;
        }
    }
    let current = processes.current();
    while(current != null){
        pendingProcesses++;
        pendingCycles += current.cycles;
        current = current.next;
    }
    return showResults(emptyCycles, finishedProcesses, pendingProcesses, pendingCycles);
}
function showResults(emptyCycles, finishedProcesses, pendingProcesses, pendingCycles) {
    let str = '';
    str += 'Ciclos vacios: ' + emptyCycles + ' \n';
    str += 'Procesos finalizados: ' + finishedProcesses + ' \n';
    str += 'Procesos pendientes: ' + pendingProcesses + ' \n';
    str += 'Ciclos pendientes: ' + pendingCycles + ' \n';
    return console.log(str);
}

Processor(300);