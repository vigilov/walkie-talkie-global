export default defineEventHandler(async (event) => {
    const {token} = useRuntimeConfig().gpt
    const query = getQuery(event)
    const propmpt = `Сгенерирую пару идей (как можно провести или чем можно дополнить) для мероприятия с названием "${query.query}". И составь план мероприятия. Вот описание мероприятия - "${query.description}". Вывод сделай в html с форматированием`

    const resp = await fetch('https://api.openai.com/v1/chat/completions',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': token,
            },
            body: JSON.stringify({"model": "gpt-4", "messages": [{"role": "user", "content": propmpt}]})
        })

    const filters = await resp.json();

    return {
        hello: filters
    }
})
