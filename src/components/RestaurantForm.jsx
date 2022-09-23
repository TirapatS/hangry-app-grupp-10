import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'

const RestaurantForm = ({ addOrUpdate, col, db }) => {
    const {handleSubmit, register, formState: {errors}, reset} = useForm()
    const [loading, setLoading] = useState(false)

    const onCreateRestaurant = async data => {
        // console.log(data)
        setLoading(true)
        // create the restaurant and store it in Cloud Firestore
        await addOrUpdate(col(db, 'restaurants'), {
            namn: data.name,
            adress: data.adress,
            ort: data.ort,
            beskrivning: data.beskrivning,
            cuisine: data.cuisine,
            typ: data.typ,
            utbud: data.utbud
        })
        // resetting text-inputs
        reset()
        // resetting select-inputs
        reset({
            typ: '', 
            utbud: ''
        })
        setLoading(false)
    }

    return (
        <Container>
            <h1>Create a new place for the hangry</h1>
            <Form noValidate onSubmit={handleSubmit(onCreateRestaurant)}>
                <Form.Group className='mb-3' controlId='namn'>
                    <Form.Label>Namn</Form.Label>
                    <Form.Control {...register('name', {
                        required: 'Please enter a name',
                        minLength: 3,
                    })} type='text' />
                    {errors.name && <span>{errors.name.message}</span>}
                </Form.Group>

                <Form.Group className='mb-3' controlId='adress'>
                    <Form.Label>Adress</Form.Label>
                    <Form.Control {...register('adress', {
                        required: 'Please enter a adress',
                        minLength: {
                            value: 3,
                            message: 'I do not think that is an adress'
                        },
                    })} type='text' />
                    {errors.adress && <span>{errors.adress.message}</span>}
                </Form.Group>

                <Form.Group className='mb-3' controlId='ort'>
                    <Form.Label>Ort</Form.Label>
                    <Form.Control {...register('ort', {
                        required: 'Please enter a city',
                        minLength: {
                            value: 3,
                            message: 'Hm, that is not a ort'
                        }
                    })} type='text' />
                    {errors.ort && <span>{errors.ort.message}</span>}
                </Form.Group>

                <Form.Group className='mb-3' controlId='beskrivning'>
                    <Form.Label>Beskrivning</Form.Label>
                    <Form.Control {...register('beskrivning', {
                        required: 'Please enter a description',
                        minLength: {
                            value: 5,
                            message: 'You do not have to write 2 pages but... Come on...'
                        }
                    })} type='text' />
                    {errors.beskrivning && <span>{errors.beskrivning.message}</span>}

                </Form.Group>

                <Form.Group className='mb-3' controlId='cuisine'>
                    <Form.Label>Cuisine</Form.Label>
                    <Form.Control {...register('cuisine', {
                        required: 'Please enter a cuisine',
                        minLength: 5
                    })} type='text' /> {/* TODO: change to select? */}
                    {errors.cuisine && <span>{errors.cuisine.message}</span>}
                </Form.Group>
                
                <Form.Group className='mb-3' controlId='typ'>
                    <Form.Label>Typ</Form.Label>
                    <select {...register('typ', {
                        required: 'Please choose a type'
                    })} className='form-select'>
                        <option selected disabled value=''>Choose</option> {/* TODO: getting a warning in console */}
                        <option value='cafe'>Cafe</option>
                        <option value='restaurang'>Restaurang</option>
                        <option value='snabbmat'>Snabbmat</option>
                        <option value='kiosk/grill'>Kiosk/Grill</option>
                        <option value='foodtruck'>Foodtruck</option>
                    </select>
                    {errors.typ && <span>{errors.typ.message}</span>}
                </Form.Group>

                <Form.Group className='mb-3' controlId='utbud'>
                    <Form.Label>Utbud</Form.Label>
                    <select {...register('utbud', {
                        required: 'Please choose'
                    })} className='form-select'>
                        <option selected disabled value=''>Choose</option> {/* TODO: getting a warning in console */}
                        <option value='lunch'>Lunch</option>
                        <option value='after work'>After Work</option>
                        <option value='middag/a la carte'>Middag/A la Carte</option>
                    </select>
                    {errors.utbud && <span>{errors.utbud.message}</span>}
                </Form.Group>

                <Button disabled={loading} type='submit'>
                    {loading ? '...creating' : 'Create'}
                </Button>
            </Form>
        </Container>
    )
}

export default RestaurantForm
