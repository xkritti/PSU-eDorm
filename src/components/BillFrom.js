import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, FormGroup, Label, Container, Button} from 'reactstrap';
const BillFrom = () => {

    const login = useSelector(state => state.login)


    useEffect(() => {
        console.log(login);
    }, []);

    var Floor = ["A", "B", "C", "D", "E", "F", "G", "H"];
    var Floorlist = Floor.map((Floor) => <option>{Floor}</option>
    );

    var Room = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    var Roomlist = Room.map((Room) => <option>{Room}</option>
    );

    return (
        <Container>
            <Form>
                <FormGroup>
                    <Label for="SSelectMulti">Floor</Label>
                    <Input type="select" name="SelectMulti" id="FloorSelect">
                        {Floorlist}
                    </Input>
                    <Label for="SelectMulti">Room</Label>
                    <Input
                        type="select"
                        name="selectMulti"
                        id="RoomSelectMulti"
                        multiple
                    >
                        {Roomlist}
                    </Input>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </Container>

    )
}
export default BillFrom;