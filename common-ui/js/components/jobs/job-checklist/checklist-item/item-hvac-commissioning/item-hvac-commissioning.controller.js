import ChecklistItemClass from '../checklist-item.class';

class ChecklistItemHVACCommissioningController extends ChecklistItemClass {
    $onInit () {
        super
            .$onInit()
            .then(() => {
                this.itemData = this.itemData || {};
            });
    }

    handlePhotoCapture (photo) {
        this.itemData.Photo = photo;

        this.setItemData(this.itemData);
    }
}

export default ChecklistItemHVACCommissioningController;
