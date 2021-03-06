import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import RoomItem from './room/RoomItem'
import {clearErrors} from '../redux/actions/roomsAction'
import Pagination from 'react-js-pagination'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Home = () => {
  const dispatch = useDispatch();
  const {rooms,resPerPage,roomsCount, filteredRoomsCount,error} = useSelector(state => state.allRooms)
  console.log(rooms);
  const router = useRouter()
  let {page = 1,location} = router.query;
  page= Number(page)
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearErrors())
    }
  },[])
  let count = roomsCount;
  if(location){
    count = filteredRoomsCount
  }
  let queryParams;
  if(typeof window !== 'undefined'){
    queryParams = new URLSearchParams(window.location.search)
  }
  const handlePagination =(pageNumber) =>{
    // router.push(`/?page=${pageNumber}`)
    if(queryParams.has('page')){
      queryParams.set('page',pageNumber)

    }else{
      queryParams.append('page',pageNumber)
    }
    router.replace({
      search: queryParams.toString()
    })
  }
  return (
    <>
    <section id="rooms" className="container mt-5">

      <h2 className='mb-3 ml-2 stays-heading'>{location? `Rooms in ${location}` : 'AllRooms'}</h2>

      <Link href='/search'>
      <a  className='ml-2 back-to-search'> <i className='fa fa-arrow-left'></i> Back to Search</a></Link>
      <div className="row">
        {rooms && rooms.length === 0 ? 
        <div className="alert alert-danger mt-5 w-100"><b>No Rooms Found.</b></div> 
        : 
        rooms?.map(room =>(
          <RoomItem key={room._id} room={room}/>
        ))}
      </div>
    </section>
    {resPerPage < count && 
    <div className='d-flex justify-content-center mt-5'>
    <Pagination activePage={page} itemsCountPerPage={resPerPage} totalItemsCount={roomsCount}
    onChange={handlePagination}
    nextPageText={'Next'}
    prevPageText={'Prev'}
    firstPageText={'First'}
    lastPageText={'Last'}
    itemClass={'page-item'}
    linkClass='page-link'/>
    </div>}
    
    </>
  )
}

export default Home