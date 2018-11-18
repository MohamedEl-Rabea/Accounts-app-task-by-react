import * as React from 'react';
import Header from './header/Header';
import Customers from './customer/Customers';
import { BrowserRouter, Route } from 'react-router-dom';
import Accounts from './account/CustomerAccounts';

const dummyData = [
    { Id: 1, name: 'Genral report', sortNumber: 0, parentId: 0 },
    { Id: 2, name: 'cat1', sortNumber: 1, parentId: 1 },
    { Id: 3, name: 'cat6', sortNumber: 6, parentId: 1 },
    { Id: 4, name: 'cat2', sortNumber: 2, parentId: 1 },
    { Id: 5, name: 'cat4', sortNumber: 4, parentId: 1 },
    { Id: 6, name: 'cat3', sortNumber: 3, parentId: 1 },
    { Id: 6, name: 'cat5', sortNumber: 5, parentId: 1 }
];

class Tree {
    Data: any[];
    constructor(data: any) {
        this.Data = data;
    }

    isLeaf = (node: any) => {
        return this.Data.findIndex(n => n.parentId === node.id) === -1 ? true : false;
    }

    sort(nodes: any[]) {
        nodes = this.sortNodesBySortNumber(nodes);
        nodes.forEach(node => {
            if (!this.isLeaf(node)) {
                node.children = this.sort(node.children);
            }
        });
        return nodes;
    }

    sortNodesBySortNumber(nodes: any[]) {
        for (let i = 0; i < nodes.length - 1; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (nodes[i].sortNumber > nodes[j].sortNumber) {
                    let temp = nodes[i];
                    nodes[i] = nodes[j];
                    nodes[j] = temp;
                }
            }
        }
        return nodes;
    }

    getStructuredTreeObject() {
        let firstLevelNodes: any[] = [];
        this.Data.forEach((node: any, index: number) => {
            if (node.parentId === 0) {
                firstLevelNodes.push({
                    id: node.Id,
                    name: node.name,
                    sortNumber: node.sortNumber,
                    children: []
                });
            }
        });

        firstLevelNodes.forEach((node: any, index: number) => {
            let result = this.getNodeChildren(node);
            if (result !== undefined) {
                node.children = node.children.concat(result);
            }
        });
        return firstLevelNodes;
    }

    getNodeChildren(node: any) {
        if (this.isLeaf(node)) {
            return;
        } else {
            let nodeChildren: any[] = [];
            this.Data.forEach((child: any, index: number) => {
                if (child.parentId === node.id) {
                    nodeChildren.push({
                        id: child.Id,
                        name: child.name,
                        sortNumber: child.sortNumber,
                        children: []
                    });
                }
            });
            nodeChildren.forEach((child: any, index: number) => {
                let result = this.getNodeChildren(child);
                if (result !== undefined) {
                    child.children = child.children.concat(result);
                }
            });
            return nodeChildren;
        }
    }
}

class App extends React.Component {
    render() {
        let tree = new Tree(dummyData);
        console.log('Not sorted', tree.getStructuredTreeObject());
        console.log('Sorted', tree.sort(tree.getStructuredTreeObject()));
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="row row-margin">
                        <Header />
                        <Customers />
                        <Route path="/accounts/:customerId" component={Accounts} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;