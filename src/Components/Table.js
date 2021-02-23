import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

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
        return {items: leadsList, requestSort, sortConfig, inputFilter, statusHandler, pickerHandler};
    }
    const {items, requestSort, inputFilter, statusHandler, sortConfig, pickerHandler} = useSortableData(leads);
    const [startDate, setStartDate] = useState('');
    const useStyles = makeStyles({
        table: {
            border: 0,
            background: '#0c162c94',
            width: '100%',
            overflowX: 'auto',
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            padding: '0 30px',
            '& span': {
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
            },
            '& td': {
                color: '#ffffff'
            }
        },
    });
    const classes = useStyles();
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                Object.keys(leads[0]).map((el, i) => {
                                        // if(el === "controls") return null
                                        return <TableCell
                                            key={i}>
                                            <span onClick={() => requestSort(el)}>{el}
                                                {
                                                    sortConfig && sortConfig.key == el && sortConfig.direction === "ascending" ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>
                                                }
                                            </span>
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
                                        </TableCell>
                                    }
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((product) => (
                            <TableRow key={product.number}>
                                <TableCell align="left">{product.number}</TableCell>
                                <TableCell align="left">{product.customer}</TableCell>
                                <TableCell align="left">{product.status}</TableCell>
                                <TableCell align="left">{product.actual}</TableCell>
                                <TableCell align="left">{product.total}</TableCell>
                                <TableCell align="left">{product.type}</TableCell>
                                <TableCell align="left">{product.create_date}</TableCell>
                                <TableCell align="left">{product.close_date}</TableCell>
                                <TableCell align="left">{product.country}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}