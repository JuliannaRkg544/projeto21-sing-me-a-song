import {prisma} from "../src/database.js"

async function main(){
    const videos = [{
        name:"cool song 2",
        youtubeLink:"https://www.youtube.com/watch?v=yX8bYwl9rKc&list=RDMM&start_radio=1&rv=Ye7FKc1JQe4"
    },
    {
        name:"cool song 3",
        youtubeLink:"https://www.youtube.com/watch?v=3sO-Y1Zbft4&list=RDMM&index=3"
    } ,
    {
        name:"cool song 4",
        youtubeLink:"https://www.youtube.com/watch?v=ynMk2EwRi4Q&list=RDMM&index=5"
    } ,
    {
        name:"cool song 5",
        youtubeLink:"https://www.youtube.com/watch?v=KkJI57RL0d4&list=RDMM&index=6"
    } ,
    {
        name:"cool song 6",
        youtubeLink:"https://www.youtube.com/watch?v=2dTMIH5gCHg&list=RDMM&index=7"
    } ,
    
]
  await prisma.recommendation.createMany({
    data:videos
})
}

main()
.catch((e)=>{
    console.log(e)
    process.exit(1)
})
.finally(async()=>{
  await prisma.$disconnect()
})