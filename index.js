import os from 'os'
import cluster from 'cluster'


const runPrimaryProcess = () =>{
const processesCount = os.cpus().length
console.log(`Primary ${process.pid} is running`)
console.log(`Forking Server with ${processesCount} processes \n  `)

    for(let index = 0; index < processesCount; index++)
        cluster.fork()

    cluster.on('exit', (worker, code , signal ) => {

            //código de exit 0 significa que o user pediu para terminar
            //exitedAfterDisconnect = se o worker perdeu conexão
        if (code !== 0 && !worker.exitedAfterDisconnect){
            console.log(`Worker ${worker.process.pid} died...`)

            //cria novos workers
            cluster.fork()
        }
    })
}

const runWorkerProcess = async () =>{
    //quem realmente trabalha
    await import('./server.js')
}


cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()