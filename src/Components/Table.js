import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const LeadsTable = ({leads}) => {
    const useSortableData = (items, config = null) => {
        const [sortConfig, setSortConfig] = useState(config);
        const [leadsList, setLeadsList] = useState(leads);
        React.useMemo(() => {
            let sortableItems = [...leadsList];
            if (sortConfig !== null) {
                sortableItems.sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            }
            setLeadsList(sortableItems)
            // return sortableItems;
        }, [items, sortConfig]);
        const requestSort = key => {
            let direction = 'ascending';
            if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
                direction = 'descending';
            }
            setSortConfig({key, direction});
        }

        const inputFilter = (e, el) => {
            if (e.target.value) {
                const filterLeads = leads.filter((it, j) => {
                    return it[el].toLowerCase().indexOf(e.target.value.toLowerCase()) != -1;
                })
                setLeadsList(filterLeads)
            } else {
                setLeadsList(leads)
            }
        }

        const statusHandler = (e, el) => {
            if (e.target.value !== 'all') {
                const filterLeads = leads.filter((it, j) => {
                    return it[el].toLowerCase().indexOf(e.target.value.toLowerCase()) != -1;
                })
                setLeadsList(filterLeads)
            } else {
                setLeadsList(leads)
            }
        }

        const pickerHandler = (date, el) => {
            // console.log(new Date(date).getMonth())
            if (date) {
                setStartDate(date)
                const filterLeads = leads.filter((it, j) => {
                    return new Date(it[el]).getTime() === new Date(date).getTime()
                })
                setLeadsList(filterLeads)
            } else {
                setStartDate('')
                setLeadsList(leads)
            }

        }

        return {items: leadsList, requestSort, inputFilter, statusHandler, pickerHandler};
    }
    // useSortableData(leads)
    const {items, requestSort, inputFilter, statusHandler, pickerHandler} = useSortableData(leads);
    const [startDate, setStartDate] = useState('');

    return (
        <table>
            <thead>
            <tr>

                {
                    Object.keys(leads[0]).map((el, i) => {
                            // if(el === "controls") return null
                            return <th
                                key={i}>
                                <span onClick={() => requestSort(el)}>{el}</span>
                                {el === 'status' ? <select onChange={(e) => statusHandler(e, el)}>
                                        <option value="all">all</option>
                                        <option value="processing">processing</option>
                                        <option value="ready">ready</option>
                                        <option value="decline">decline</option>
                                    </select>
                                    : el === 'type' ? <select onChange={(e) => statusHandler(e, el)}>
                                            <option value="all">all</option>
                                            <option value="product">product</option>
                                            <option value="company">company</option>
                                        </select>
                                        : el === 'create_date' ?
                                            <DatePicker dateFormat="MMMM d, yyyy" selected={startDate}
                                                        onChange={date => pickerHandler(date, el)}/>
                                            :
                                            <input type="text" onChange={(e) => inputFilter(e, el)}/>}
                            </th>
                        }
                    )
                }

                {/*<th>Number*/}
                {/*    <input type="text"/>*/}
                {/*</th>*/}
                {/*<th>Customer*/}
                {/*    <input type="text"/>*/}
                {/*</th>*/}
                {/*<th>Status*/}
                {/*    <select>*/}
                {/*        <option value="1">1</option>*/}
                {/*        <option value="2">2</option>*/}
                {/*        <option value="3">3</option>*/}
                {/*    </select>*/}
                {/*</th>*/}
                {/*<th>Actual*/}
                {/*    <input type="text"/>*/}
                {/*</th>*/}
                {/*<th>Total*/}
                {/*    <input type="text"/>*/}
                {/*</th>*/}
                {/*<th>Type*/}
                {/*    <select>*/}
                {/*        <option value="1">1</option>*/}
                {/*        <option value="2">2</option>*/}
                {/*        <option value="3">3</option>*/}
                {/*    </select>*/}
                {/*</th>*/}
                {/*<th>Create Date*/}
                {/*    <input type="text"/>*/}
                {/*</th>*/}
                {/*<th>Close Date*/}
                {/*    <input type="text"/>*/}
                {/*</th>*/}
                {/*<th>Country*/}
                {/*    <input type="text"/>*/}
                {/*</th>*/}
            </tr>
            </thead>
            <tbody>
            {items.map(product => (
                <tr key={product.number}>
                    <td>{product.number}</td>
                    <td>{product.customer}</td>
                    <td>{product.status}</td>
                    <td>{product.actual}</td>
                    <td>{product.total}</td>
                    <td>{product.type}</td>
                    <td>{product.create_date}</td>
                    <td>{product.close_date}</td>
                    <td>{product.country}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}