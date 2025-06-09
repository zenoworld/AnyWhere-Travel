

const calculateAvgRating = (reviews)=> {
    const totalRating=reviews?.reduce((review,item)=> review+item.reviewRating,0);
    const avgRating=
    totalRating === 0
    ? "" 
    : totalRating ===1
    ? totalRating 
    : (totalRating / reviews?.length).toFixed(1);
    return{
        totalRating,
        avgRating
    }
}

export default calculateAvgRating