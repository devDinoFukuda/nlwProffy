module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    
    const insertedProffy =  await db.run(`       
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)           
 
    const proffy_id = insertedProffy.lastID  
    
    
    const insertedClasss = await db.run(`
            INSERT INTO classes(
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            )
    `)

    const class_id = insertedClasss.lastID

    
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.tme_from}",
                "${classScheduleValue.time_to}"
            )
        `)
    })

    //aqui irá ser executado os db.runs da class schedules
    await Promise.all(insertedAllClassScheduleValues)
}