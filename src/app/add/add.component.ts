import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';
import { FormatService } from '../services/format.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TypeService } from '../services/type.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

    player: string = null;
    deck: string = null;
    format: any = null;
    availableFormats: any[] = [];
    availableTypes: any[] = [];
    tForm: FormGroup;

    constructor(private addService: AddService, private formatService: FormatService, private typeService: TypeService) { }

    ngOnInit() {
        this.getFormats();
        this.getTypes();
        this.loadForm();
    }

    getFormats() {
        this.formatService.findAll().subscribe((result: any) => {
            this.availableFormats = result.content;
        });
    }

    getTypes() {
        this.typeService.findAll().subscribe((result: any) => {
            this.availableTypes = result.content;
        });
    }

    loadForm() {
        this.tForm = new FormGroup({
            type: new FormControl(),
            title: new FormControl(),
            date: new FormControl(),
            location: new FormControl(),
            comments: new FormControl()
        });
    }

    addPlayer() {
        this.addService.addPlayer(this.player).subscribe(r => this.player = null);
    }

    addDeck() {
        this.addService.addDeck(this.deck, this.format).subscribe(r => this.deck = null);
    }

    addTournament() {
        let t: any = _.cloneDeep(this.tForm.getRawValue());
        t.date = this.tForm.get("date").value.getTime();
        this.addService.addTournament(t).subscribe(r => {
            console.log(r);
        });
    }

}
