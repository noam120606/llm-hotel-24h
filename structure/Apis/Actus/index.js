module.exports = async () => {
    const apiKey = "bd7dc463a8a240e38989b34b363e8ae7";
    const lat = 48.00611;
    const lon = 0.199556;
    const url = `https://api.worldnewsapi.com/search-news?localisation-filter=${lat},${lon},20&language=fr`;

    const response = await fetch(url, {
        headers: {
            'x-api-key': apiKey
        }
    });

    const data = await response.json();
    console.log(data);
    return data.news.map(n => ({
        title: n.title,
        resume: n.summary,
        date: n.publish_date
    }))
}
