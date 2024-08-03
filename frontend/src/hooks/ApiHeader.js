export const headers = () => {
    let storagess = localStorage.getItem('chat-user');
    const header = { 'Authorization': `Bearer ${JSON.parse(storagess).token}` };
    return header;
}