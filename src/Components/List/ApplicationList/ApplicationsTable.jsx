import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import "./ApplicationsTable.css";

const APPLICATION_STAGE = {
    LETTER_OF_INTEREST: 0,
    FULL_APPLICATION: 1
}

// Test data
const data = [
        {
            name: 'UW Blueprint',
            rating: '5.0',
            lastReviewed: 'October 31, 2019',
            url: 'https://uwblueprint.org',
            stage: APPLICATION_STAGE.LETTER_OF_INTEREST
        },
        {
            name: 'Company A',
            rating: '4.0',
            lastReviewed: 'October 21, 2019',
            url: 'https://uwblueprint.org',
            stage: APPLICATION_STAGE.LETTER_OF_INTEREST
        },
        {
            name: 'Company B',
            rating: '2.0',
            lastReviewed: 'October 11, 2019',
            url: 'https://uwblueprint.org',
            stage: APPLICATION_STAGE.LETTER_OF_INTEREST
        },
        {
            name: 'Company C',
            rating: '5.0',
            lastReviewed: 'October 1, 2019',
            url: 'https://uwblueprint.org',
            stage: APPLICATION_STAGE.LETTER_OF_INTEREST
        },
        {
            name: 'Company D',
            rating: '3.0',
            lastReviewed: 'October 13, 2019',
            url: 'https://uwblueprint.org',
            stage: APPLICATION_STAGE.LETTER_OF_INTEREST
        }
];

export default class ApplicationList extends Component {

    render() {
      console.log(this.props);
      //Pre-calculate the applications array before rendering

        return (
          <div className="application-list">
            <Paper>
                All Applicants
                <Table className="table2">
                    <TableHead>
                        <TableRow>
                            <TableCell>Applicant Name</TableCell>
                            <TableCell align="left">Rating</TableCell>
                            <TableCell align="left">Last reviewed</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.applications ?
                          this.props.applications.map(application => (
                            <TableRow hover>
                                <TableCell component="th" scope="row">
                                    {application[ 'Organization Name']}
                                </TableCell>
                                <TableCell align="left">{application['rating'] || "0/5" }</TableCell>
                                <TableCell align="left">{application['last reviewed'] || "never" }</TableCell>
                                <TableCell align="left"><a rel="noopener noreferrer" target="_blank" href={application.url}>Open application</a></TableCell>
                            </TableRow>
                        ))
                        : "ERROR LOADING APPLICATIONS FROM DATABASE"
                      }
                    </TableBody>
                </Table>
            </Paper>
            </div>
        )
    }
}
