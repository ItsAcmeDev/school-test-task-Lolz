module.exports = (pagination, cb_data) => {
    pagination.last = pagination.last || 1;
    const back_cb = cb_data + String(pagination.current > 1 ? pagination.current - 1 : pagination.last),
        forward_cb = cb_data + String(pagination.current < pagination.last ? pagination.current + 1 : 1);
    return [
        {text: `◀️`, callback_data: back_cb},
        {text: `${pagination.current}/${pagination.last}`, callback_data: "none"},
        {text: `▶️`, callback_data: forward_cb}
    ];
};
