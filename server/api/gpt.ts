export default defineEventHandler(async (event) => {
    const {token} = useRuntimeConfig().gpt
    const query = getQuery(event)
    const propmpt = `We have several services for any planning event:
1. Location Selection
2. Food Catering Selection
3. Shisha Catering Selection
4. Drink Catering Selection
5. Music Selection
6. Event Host Selection
7. Board Games Selection
8. Sport Games Selection
9. Kids Games Selection
10. Hike/Trip Selection
11. Villages Master Classes Selection
12. Photographers
13. Videographers
14. Education Lectures Selection

Propose please plan of 5 points for the event with the name “${query.query}”, which related the services described above.
Wrap the response in json, each option should have a title field and a description field. Example of response: [{'title':'...', 'description':'...'}, ...]. response type is list of dictionaries.`

    const resp = await fetch('https://api.openai.com/v1/chat/completions',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': token,
                'OpenAI-Organization': 'org-xKRpliiv6Z20BC0OvEdWZQRI'
            },
            body: JSON.stringify({"model": "gpt-4", "messages": [{"role": "user", "content": propmpt}]})
        })

    const filters = await resp.json();

    return {
        hello: filters
    }
})
